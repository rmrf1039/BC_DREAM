import * as React from 'react'
import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import axios from 'axios';
import { isMobile, drawKeypoints, drawSkeleton } from '../components/utils'
import '@tensorflow/tfjs-backend-webgl';

import { Button, Container, Text, Hr } from "nes-ui-react";

export class PoseNet extends React.Component {
  static defaultProps = {
    videoWidth: window.outerWidth,
    videoHeight: (window.outerWidth / 4) * 3,
    flipHorizontal: false,
    algorithm: 'single-pose',
    mobileNetArchitecture: isMobile() ? 0.50 : 1.01,
    showVideo: true,
    showSkeleton: true,
    showPoints: true,
    minPoseConfidence: 0.2,
    minPartConfidence: 0.6,
    maxPoseDetections: 2,
    nmsRadius: 20.0,
    outputStride: 16,
    imageScaleFactor: 0.5,
    skeletonColor: 'aqua',
    skeletonLineWidth: 2,
    loadingText: '加載程式中...',
    repsPerSet: 10, // 每組數量，預設10
    totalSets: 2,  // 總組數，預設3
    skipIndex: [0,1,2,3,4,5,6,7,8,9,10]
  }

  constructor(props) {
    super(props, PoseNet.defaultProps)
    this.cancel = props.cancel;
    this.finish = props.finish;
    this.disable = props.disable;
    this.voices = null;
    this.state = { 
      token_id: props.state.gear, 
      loading: true,
      exerciseStage: 'None',     // 當前動作狀態
      feedback: '',
      state_sequence: [],     // 動作狀態列表,正確順序為[s2,s3,s2]
      correctCount: 0,   // 正確動作次數
      incorrectCount: 0, // 錯誤動作次數
      totalCount: 0,
      totalCorrectCount: 0,
      ExerciseError: false,
      exerciseType: props.state.excercise_type,
      currentSet: 1,            // 當前組數
      restTimeRemaining: 0,     // 組間休息剩餘時間 (秒)
      isResting: false,         // 是否正在進行組間休息
      readyForm: false,
    }
  }

  getCanvas = elem => {
    this.canvas = elem
  }

  getVideo = elem => {
    this.video = elem
  }

  async componentDidMount() {
    await tf.ready();
    const model = poseDetection.SupportedModels.BlazePose;
    const detectorConfig = {
      runtime: 'tfjs',
      enableSmoothing: true,
      modelType: 'lite'
    };
    this.net = await poseDetection.createDetector(model, detectorConfig);
    try {
      await this.setupCamera().then(video => this.videoObj = video)
    } catch(e) {
      throw 'This browser does not support video capture, or this device does not have a camera'
    } finally {
      this.setState({ loading: false })
    }

    this.detectPose();

    let voices_tmp = window.speechSynthesis.getVoices();

    this.voices = voices_tmp.filter(r => r.name === 'Google 國語（臺灣）');
  }

  async setupCamera() {
      // MDN: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw 'Browser API navigator.mediaDevices.getUserMedia not available'
    }

    const { videoWidth, videoHeight } = this.props
    const video = this.video
    const mobile = isMobile()

    video.width = videoWidth
    video.height = videoHeight

    // MDN: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'user',
        width: mobile ? void 0 : videoWidth,
        height: mobile ? void 0: videoHeight,
      }
    });

    video.srcObject = stream
    this.stream = stream;

    return new Promise(resolve => {
      video.onloadedmetadata = () => {
        // Once the video metadata is ready, we can start streaming video
        video.play()
        resolve(video)
      }
    })
  }

  detectPose() {
    const { videoWidth, videoHeight } = this.props
    const canvas = this.canvas
    const ctx = canvas.getContext('2d')

    canvas.width = videoWidth
    canvas.height = videoHeight

    this.poseDetectionFrame(ctx)
  }

  poseDetectionFrame(ctx) {
    const {
      minPoseConfidence,
      minPartConfidence,
      videoWidth,
      videoHeight,
      showVideo,
      showPoints,
      showSkeleton,
      skeletonColor,
      skeletonLineWidth,
      skipIndex
    } = this.props

    const net = this.net
    const video = this.video

    const poseDetectionFrameInner = async () => {
      let poses = [];
      
      poses = await net.estimatePoses(video, false);


      ctx.clearRect(0, 0, videoWidth, videoHeight);

      if (showVideo) {
        ctx.save()
        // ctx.scale(-1, 1)
        // ctx.translate(-videoWidth, 0)
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight)
        ctx.restore()
      }

      // For each pose (i.e. person) detected in an image, loop through the poses
      // and draw the resulting skeleton and keypoints if over certain confidence
      // scores
      poses.forEach(({ score, keypoints }) => {
        if (score >= minPoseConfidence) {
          //畫出各部位的姿勢估計
          if (showPoints) {
            drawKeypoints(keypoints, minPartConfidence, skeletonColor, ctx, 1, skipIndex);
          }
          if (showSkeleton) {
            drawSkeleton(keypoints, minPartConfidence, skeletonColor, skeletonLineWidth, ctx, 1, skipIndex);
          }
          // 進行指定運動分析
          this.ExerciseAnalyze(keypoints, minPartConfidence);
          this.startRestCountdown();
        }

      })

      // 畫面重複更新
      this.poseDetectionFrameId = requestAnimationFrame(poseDetectionFrameInner);
    }

    poseDetectionFrameInner()
  }

  switchExerciseType = (exerciseType, resetCount = true) => {
    this.setState({ exerciseType });
    const sequence = this.state.state_sequence;
    sequence.length = 0
    if(resetCount){
      this.setState({ 
        correctCount: 0,
        incorrectCount: 0,
        currentSet: 1,
      });
    }

    this.setState({
      exerciseStage: 'None',
      ExerciseError: false,
      readyForm:false
    });
  };

  ExerciseAnalyze = (keypoints, minPartConfidence) => {
    if (this.disable) return;

    // 若正在休息則返回
    if(this.state.isResting) return;

    const { exerciseType } = this.state;
    const currentStage = this.state.exerciseStage; // 動作狀態
    const sequence = this.state.state_sequence; // 狀態list

    const rightEarIndex = 12;
    const leftEarIndex = 11;

    let kneeKeypoint;
    let hipKeypoint;
    let ankleKeypoint;
    let wristKeypoint;
    let elbowKeypoint;
    let shoulderKeypoint;

    if(keypoints[rightEarIndex].score > keypoints[leftEarIndex].score){
      kneeKeypoint = keypoints[26];
      hipKeypoint = keypoints[24];
      ankleKeypoint = keypoints[28];
      wristKeypoint = keypoints[16];
      elbowKeypoint = keypoints[14];
      shoulderKeypoint = keypoints[12];
    }
    else{
      kneeKeypoint = keypoints[25];
      hipKeypoint = keypoints[23];
      ankleKeypoint = keypoints[27];
      wristKeypoint = keypoints[15];
      elbowKeypoint = keypoints[13];
      shoulderKeypoint = keypoints[11];
    }

    // 動作分析
    switch(exerciseType) {
      case 'squat':
        // 深蹲動作分析

        // 判斷當前畫面中是否抓到膝蓋和髖部
          // 計算膝髖連線與垂直線夾角
          const kneeAngle = Math.abs((90 - Math.atan2(kneeKeypoint.y - hipKeypoint.y, kneeKeypoint.x - hipKeypoint.x) * (180 / Math.PI)));

          // 以膝髖連線與垂直線夾角判斷動作狀態
          // 角度<=32度為狀態s1
          if (kneeAngle <= 25) {
            if (currentStage !== 's1') {
              this.setState({ exerciseStage: 's1' }, () => {
                // 判斷動作狀態list的順序是否正確([s2,s3,s2])
                if (
                  sequence.length === 3 &&
                  sequence[0] === 's2' &&
                  sequence[1] === 's3' &&
                  sequence[2] === 's2'
                ) {
                  // 過程中有動作錯誤則增加不正確次數
                  if (this.state.ExerciseError) {
                    this.setState(prevState => ({
                      incorrectCount: prevState.incorrectCount + 1
                    }));
                  } else {
                    this.setState(prevState => ({
                      correctCount: prevState.correctCount + 1
                    }));
                    this.speak('叮咚');
                  }
                }
                else{
                  if(sequence.length !== 0){
                    this.setState(prevState => ({
                      incorrectCount: prevState.incorrectCount + 1
                    }));
                    this.speak('動作不完整');
                  }
                }
                // 清空動作錯誤
                this.setState({ ExerciseError: false});
                this.setState({ feedback: ''});
                sequence.length = 0;
              });
            }
          } else if (kneeAngle >= 40 && kneeAngle <= 60) {
            // 狀態s2
            if (currentStage !== 's2') {
              this.setState({ exerciseStage: 's2' }, () => {
          
                sequence.push('s2');
              });
            }
          } else if (kneeAngle >= 75) {
            // 狀態s3
            if (currentStage !== 's3') {
              this.setState({ exerciseStage: 's3' }, () => {
          
                sequence.push('s3');
              });
            }
          }

          // 處於狀態s3時下蹲角度超過95度判斷動作錯誤
          if(kneeAngle > 105 && currentStage === 's3'){
            // 顯示動作錯誤提醒並記錄
            if(!this.state.feedback.includes('蹲太下去了!')){
              this.setState(prevState => ({
                ExerciseError: true,
                feedback: prevState.feedback + '蹲太下去了!, '
              }));
              this.speak('蹲太下去了');
            }
          }

          // 判斷動作過程中膝蓋是否超過腳趾
          if(currentStage === 's2' || currentStage === 's3'){
            if(ankleKeypoint.score >= minPartConfidence){
              const ankleAngle = Math.atan2(ankleKeypoint.y - kneeKeypoint.y, ankleKeypoint.x - kneeKeypoint.x) * (180 / Math.PI) - 90;

              if(Math.abs(ankleAngle) > 30){
                // 腳踝膝蓋連線與垂直線夾角超過30度時判斷動作錯誤
                if(!this.state.feedback.includes('膝蓋超過腳趾!')){
                  this.setState(prevState => ({
                    ExerciseError: true,
                    feedback: prevState.feedback + '膝蓋超過腳趾!, '
                  }));
                  this.speak('膝蓋超過腳趾');
                }
              }
            }                
          }

          
          // 控制list長度
          if (sequence.length > 3) {
            sequence.shift(); 
          }

          this.setState({ state_sequence: sequence});

        break
      case 'push_up':
        // 伏地挺身分析

        if (wristKeypoint.score >= minPartConfidence &&
            elbowKeypoint.score >= minPartConfidence &&
            shoulderKeypoint.score >= minPartConfidence &&
            kneeKeypoint.score >= minPartConfidence &&
            hipKeypoint.score >= minPartConfidence
          ) {


            let armAngle = Math.abs(
              (Math.atan2(wristKeypoint.y - elbowKeypoint.y, wristKeypoint.x - elbowKeypoint.x) -
                Math.atan2(shoulderKeypoint.y - elbowKeypoint.y, shoulderKeypoint.x - elbowKeypoint.x)) *
                (180 / Math.PI)
            );

            const shoulderAngle = Math.abs(
              (Math.atan2(elbowKeypoint.y - shoulderKeypoint.y, elbowKeypoint.x - shoulderKeypoint.x) -
                Math.atan2(hipKeypoint.y - shoulderKeypoint.y, hipKeypoint.x - shoulderKeypoint.x)) *
                (180 / Math.PI)
            );

            const hipAngle = Math.abs( 
              (Math.atan2(shoulderKeypoint.y - hipKeypoint.y, shoulderKeypoint.x - hipKeypoint.x) -
                Math.atan2(kneeKeypoint.y - hipKeypoint.y, kneeKeypoint.x - hipKeypoint.x)) *
                (180 / Math.PI)
            );

            if(armAngle > 180){
              armAngle = 360 - armAngle;
            }

            if(armAngle > 160 && shoulderAngle > 40 && hipAngle > 165){
              this.setState({ readyForm: true });
            }

            if(this.state.readyForm) {
              if(armAngle > 150){
                if(currentStage !== 's1') {
                  this.setState({ exerciseStage: 's1' }, () => {
                    if (
                      sequence.length === 3 &&
                      sequence[0] === 's2' &&
                      sequence[1] === 's3' &&
                      sequence[2] === 's2'
                    ) {
                      // 過程中有動作錯誤則增加不正確次數
                      if (this.state.ExerciseError) {
                        this.setState(prevState => ({
                          incorrectCount: prevState.incorrectCount + 1
                        }));
                      } else {
                        this.setState(prevState => ({
                          correctCount: prevState.correctCount + 1
                        }));
                        this.speak('叮咚');
                      } 
                    }
                    // 清空動作錯誤
                    this.setState({ ExerciseError: false});
                    this.setState({ feedback: ''});
                    sequence.length = 0;
                  });
                }
              }
              else if(armAngle > 110 && armAngle <= 140){
                // 狀態s2
                if (currentStage !== 's2') {
                  this.setState({ exerciseStage: 's2' }, () => {
                    sequence.push('s2');
                  });
                }
              }
              else if(armAngle <= 90){
                // 狀態s3
                if (currentStage !== 's3') {
                  this.setState({ exerciseStage: 's3' }, () => {
                    sequence.push('s3');
                  });
                }
              }

              if(currentStage === 's2' || currentStage === 's3'){
                if(hipAngle < 160 && !this.state.ExerciseError){
                  this.setState({
                    ExerciseError: true,
                    feedback: '注意下半身姿勢'
                  });
                  this.speak('注意下半身姿勢');
                }                
              }
    
              // 控制list長度
              if (sequence.length > 3) {
                sequence.shift(); 
              }
            }
          }
        break
      case 'bicep_curl':
        // 二頭彎舉分析

        if (
          wristKeypoint.score >= minPartConfidence &&
          elbowKeypoint.score >= minPartConfidence &&
          shoulderKeypoint.score >= minPartConfidence
        ) {
          // 計算手臂抬起角度
          let armAngle = Math.abs(
            (Math.atan2(shoulderKeypoint.y - elbowKeypoint.y, shoulderKeypoint.x - elbowKeypoint.x) - 
              Math.atan2(wristKeypoint.y - elbowKeypoint.y, wristKeypoint.x - elbowKeypoint.x))) *
              (180 / Math.PI);
          if(armAngle > 180){
            armAngle = 360 - armAngle;
          }

          if (armAngle >= 135){
            if (currentStage !== 's1') {
              this.setState({ exerciseStage: 's1' }, () => {
                // 判斷動作狀態list的順序是否正確([s2,s3,s2])
                if (
                  sequence.length === 3 &&
                  sequence[0] === 's2' &&
                  sequence[1] === 's3' &&
                  sequence[2] === 's2'
                ) {
                  // 過程中有動作錯誤則增加不正確次數
                  if (this.state.ExerciseError) {
                    this.setState(prevState => ({
                      incorrectCount: prevState.incorrectCount + 1
                    }));
                  } else {
                    this.setState(prevState => ({
                      correctCount: prevState.correctCount + 1
                    }));
                    this.speak('叮咚');
                  }
                }
                else{
                  if(sequence.length !== 0){
                    this.speak('動作不完整');
                    if(!this.state.ExerciseError){
                      this.setState(prevState => ({
                        incorrectCount: prevState.incorrectCount + 1
                      }));                      
                    }
                  }
                }
                // 清空動作錯誤
                this.setState({ ExerciseError: false});
                this.setState({ feedback: ''}); 
                sequence.length = 0;
              });
            }
          }
          else if(armAngle > 80 && armAngle <= 115){
            // 狀態s2
            if (currentStage !== 's2') {
              this.setState({ exerciseStage: 's2' }, () => {
          
                sequence.push('s2');
              });
            }
          }
          else if(armAngle < 65){
            // 狀態s3
            if (currentStage !== 's3') {
              this.setState({ exerciseStage: 's3' }, () => {
          
                sequence.push('s3');
              });
            }
          }

          // 控制list長度
          if (sequence.length > 3) {
            sequence.shift(); 
          }


          this.setState({ state_sequence: sequence});

          const shoulderAngle = Math.abs(
            (Math.atan2(elbowKeypoint.y - shoulderKeypoint.y, elbowKeypoint.x - shoulderKeypoint.x) - Math.PI / 2) *
              (180 / Math.PI)
          );

          if(shoulderAngle > 50 && !this.state.ExerciseError){
            this.setState({
              ExerciseError: true,
              feedback: '注意上臂位置'
            });
            this.speak('注意上臂位置');
          }
        }
        break
      default: 
        // 預設不做任何事
        break;
    };
  }
  
  startRestCountdown() {
    const { correctCount, incorrectCount, isResting, exerciseType, currentSet } = this.state;
    const { repsPerSet, totalSets } = this.props;

    // 檢查是否達到組數，並且不在休息狀態中
    if (!isResting && correctCount + incorrectCount >= repsPerSet * currentSet) {
      // 開始進入組間休息時間
      this.setState({ isResting: true, restTimeRemaining: 5, readyForm:false });
      this.speak('該休息囉');
      this.switchExerciseType(exerciseType, false);
      // 定時器，每秒更新休息時間
      const restTimer = setInterval(() => {
        this.setState(prevState => ({ restTimeRemaining: prevState.restTimeRemaining - 1 }), () => {
          // 檢查休息時間是否結束
          if (this.state.restTimeRemaining === 0) {
            clearInterval(restTimer); // 停止定時器

            this.setState(prevState => ({ 
              currentSet: prevState.currentSet + 1,
            }), () => {
              // 檢查是否達到總組數
              if (this.state.currentSet <= totalSets) {
                // 繼續進行運動分析
                this.setState({ isResting: false });
              } else {
                // 停止運動分析並回傳結果
                this.sendAnalyzeResult(exerciseType)
              }
            });
          }
        });
      }, 1000);
    }
  }

  sendAnalyzeResult = () => {
    const { correctCount, incorrectCount, exerciseType } = this.state;
    const count = incorrectCount + correctCount;
    const accuracy = correctCount / count;

    //const count = 50; //test
    //const accuracy = .9; //test

    const analysisResult = {
      accuracy: accuracy,
      count: count,
      type: exerciseType
    };

    new Promise((resolve) => {
      if (this.state.token_id) {
        axios.put(`/api/target/${this.state.token_id}`)
        .then(() => resolve());
      } else {
        resolve();
      }
    })
    .then(() => {
      axios.post(
        '/api/exercises/',
        analysisResult
      )
      .then((res) => {
        this.finish({
          ...res.data,
          accuracy: analysisResult.accuracy,
          total_count: analysisResult.count,
          type: analysisResult.type,
        });
      })
      .catch(err => {
        console.log(err)
      });
    });

    this.switchExerciseType('none');
  };

  speak = (message) => {
    // initialize voices
    const speechSynthesis = window.speechSynthesis;
    speechSynthesis.lang = 'zh-TW';
    
    const utterance = new SpeechSynthesisUtterance(message);

    utterance.voice = this.voices[0];
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;

    utterance.onerror = (error) =>{
      console.log('SpeechSynthesis occurs error: ', error)
    }
    
    speechSynthesis.speak(utterance);
    console.log('SpeechSynthesis message: ', message);
  }

  // 輸出組件
  render() {
    const { currentSet, isResting, restTimeRemaining, correctCount, incorrectCount, exerciseStage, feedback  } = this.state;
    const count = incorrectCount + correctCount;
    const loading = this.state.loading
      ? <div className="PoseNet__loading">{ this.props.loadingText }</div>
      : '';
    return (
      <div>
        <div className="PoseNet">
          { loading }
          <video className='invisible position-absolute'  playsInline ref={ this.getVideo }></video>
          <canvas ref={ this.getCanvas }></canvas>
        </div>

        <div className="position-fixed bottom-0 start-50 translate-middle-x w-100 pb-5">
          <Container roundedCorners alignTitle="center" className="m-3 mt-0 gameboy-layout p-2">
            {
              feedback && <Text>建議：<>{feedback}</></Text>
            }
            {
              isResting && <Text>請休息<>{restTimeRemaining}</>秒</Text>
            }
            {
              (feedback || isResting)
              &&
              <Hr />
            }
            <Text>當前狀態: {exerciseStage}</Text>
            <Text>當前組數: {currentSet}</Text>
            <Text size='medium'>正確率：{ count > 0 ? Math.round(correctCount/count*100) : 0 }％ ({correctCount}/{count})</Text>
          </Container>
        
          <div className='ps-3 pe-3 d-flex flex-row gap-3'>
            <Button color="error" size="medium" fontColor="black" className="w-100" onClick={() => {
              this.switchExerciseType('rest');
              this.stream.getVideoTracks()[0].stop();
              this.video.src = '';
              this.cancel();
              }}>取消</Button>
            <Button color="error" size="medium" fontColor="black" className="w-100" onClick={() => this.sendAnalyzeResult()}>停止分析</Button>
          </div>
      </div>
      </div>
    )
  }
}