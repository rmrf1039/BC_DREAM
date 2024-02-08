import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PoseNet } from '../components/PoseNet';

import Carousel from 'react-bootstrap/Carousel';
import { Button } from "nes-ui-react";

const Realtime = ({ layout = null }) => {
  useEffect(() => {
    layout?.({
      type: 'init',
      data: {
        isShowBack: false,
        isShowMenu: false,
        title: '即時追蹤',
        backgroundColor: '#E0DCDB',
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout]);

  const { state } = useLocation();
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [viewCount, setViewCount] = useState(1);
  const [enablePoseNet, setEnablePoseNet] = useState(false);
  const [voices, setVoices] = useState(null);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
    setViewCount(viewCount + 1);
  };

  useEffect(() => {
    let voices_tmp = window.speechSynthesis.getVoices();

    voices_tmp = voices_tmp.filter(r => r.name === 'Google 國語（臺灣）');
    setVoices(voices_tmp[0]);
  }, []);

  useEffect(() => {
    if (voices?.[0]) console.log('聲音加載完畢');
  }, [voices])

  return (
    <>
      {
        state
        ?
        <>
          <div className={`${!enablePoseNet && 'invisible position-absolute'}`}>
            <PoseNet
              state={state}
              disable={enablePoseNet}
              voices={voices}
              cancel={() => navigate('/')}
              finish={(result) => navigate('/exercise/result', {
                state: {
                  result
                }
              })}
            />
          </div>

          {
            !enablePoseNet &&
            <>
              <div className="w-100 top-50 start-50 translate-middle position-absolute">
                <Carousel activeIndex={index} onSelect={handleSelect} indicators={false}>
                  <Carousel.Item>
                    <div className='d-flex justify-content-center flex-column'>
                      <img className='d-block m-auto mb-3' src='https://lh3.google.com/u/0/d/1XE_UeDgBedirs5QKqOgR88_X_DUiJbtP=w3016-h1528-iv1' height={300}></img>
                      <h3 className='text-center'>請將裝置放置於您的側邊</h3>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className='d-flex justify-content-center flex-column'>
                      <img className='d-block m-auto mb-3' src='https://lh3.google.com/u/0/d/1gHRbsIBKr5BTWgraUXG1W2pVVdm9NAPL=w3016-h528-iv1' height={300}></img>
                      <h3 className='text-center'>畫面需包含全身</h3>
                    </div>
                  </Carousel.Item>
                </Carousel>
              </div>
              {
                (viewCount >= 2) &&
                <div className='position-fixed bottom-0 start-50 translate-middle-x w-100 p-3 pb-5'>
                  <Button color="success" size="medium" fontColor="black" className="w-100" onClick={() => setEnablePoseNet(true)}>開始運動</Button>
                </div>
              }
            </>
          }
        </>
        :
        <h1>請從主頁申請進入該程式</h1>
      }
    </>
  );
}

export default Realtime;