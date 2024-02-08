import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// import html2canvas from 'html2canvas';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import _ from 'lodash';

import { wearCollection } from '../components/WearIconCollect';
import { Container, IconButton, Heading, Br, Hr, Text, Radio } from "nes-ui-react";
import GearSuggestionModal from '../components/GearSuggestionModal';

const Market = ({ layout = null }) => {
  useEffect(() => {
    layout?.({
      type: 'init',
      data: {
        isShowMenu: true,
        title: '市場',
        backgroundColor: '#DADADA',
      }
    });
  }, [layout]);

  //const { profile } = useAxios()
  const profile = {
    gender: 'Male',
  }
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);
  // const [drawerShowBorder, setDrawerShowBorder] = useState(true);
  const genderMark = useMemo(() => (profile.gender === 'Male'?'b':'g'), [profile.gender]);

  // Initial values
  const [values, setValues] = useState({
    type: genderMark,
    level: 0,
    lucky: "regular",
    style: 0,
    drawRef: useRef(),
    draw: "",
  });

  const [isRecommendationModalOpen, setIsRecommendationModalOpen] = useState(false);
  const [recommendation, setRecommendation] = useState({
    used: false,
  });

  const processedValues = useMemo(() => {
    const reval = _.cloneDeep(values)

    reval.level = parseInt(reval.level, 10);
    reval.type = reval.type + (parseInt(reval.style, 10) + 1);
    reval.custom = '';

    delete reval.style;
    delete reval.drawRef;
    delete reval.draw;

    return reval;
  }, [values]);

  const workSets = {
    health: {
      work_max: [40, 50, 60],
      work_min: [20, 30 ,40],
    },
    workout: {
      work_max: [60, 70, 80],
      work_min: [40, 50, 60],
    }
  };
  
  const typeConfigs = [
    {
      name: '髮式',
      value: genderMark,
      description: '該目標以「健康養身」為主，運動持續力最為重要。',
      orientation: 'health',
    },
    {
      name: '衣服',
      value: 'c',
      description: '該目標以「健康養身」為主，運動持續力最為重要。',
      orientation: 'health',
    },
    {
      name: '褲子',
      value: `p${genderMark}`,
      description: '該目標以「健身訓練」為主，運動強度最為重要。',
      orientation: 'workout',
    },
    {
      name: '鞋子',
      value: 's',
      description: '該目標以「健身訓練」為主，運動強度最為重要。',
      orientation: 'workout',
    }
  ];
  
  const luckyConfigs = [
    {
      name: '一般',
      value: 'regular',
      description: '一般品質並無加乘效果。',
    },
    {
      name: '進階',
      value: 'advanced',
      description: '每次運動後，進階品質有 1%~20% 加乘效果在可獲經驗值上。'
    },
    {
      name: '高科技',
      value: 'high-tech',
      description: '每次運動後，高科技品質有 21%~40% 加乘效果在可獲經驗值上。'
    }
  ];
  
  const levelConfigs = [
    {
      name: '初級',
      value: 0,
      description: '',
    },
    {
      name: '中級',
      value: 1,
      description: '',
    },
    {
      name: '高級',
      value: 2,
      description: '',
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  const handleSubmit = () => {
    axios.post('api/gears/', processedValues)
    .then((res) => {
      navigate(`/gear?tokenId=${res.data?.gear?.token_id}`, {
        state: {
          data: res.data?.gear,
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    if (phase === 4) {
      setValues((v) => {
        const { drawRef, ...rest } = v;
  
        return rest;
      });
    }
  }, [phase]);

  useEffect(() => {
    axios.get('/api/recommend/')
    .then((res) => {
      if (res.data?.orientation) {
        setRecommendation({
          ...res.data,
          used: false,
        });
        setIsRecommendationModalOpen(true);
      }
    });
  }, [])

  return (
    <>
      <GearSuggestionModal
        data={recommendation}
        open={isRecommendationModalOpen}
        onCancel={() => setIsRecommendationModalOpen(false)}
        onConfirm={() => {
          setIsRecommendationModalOpen(false);
          setValues({
            ...values,
            type: recommendation.orientation === 'health' ? genderMark : `p${genderMark}`,
            level: recommendation.level,
          });
          setRecommendation({
            ...recommendation,
            used: true,
          });
        }}
      />
      <Container roundedCorners title={`步驟一：設定目標`} className={`${phase !== 0 && 'd-none'} m-3 mt-0 bg-marketContainer`}>
        <Heading bottomBr dense size="xlarge" className="pt-0">款式決定目標</Heading>
        <Text size="medium">「俊」提供兩種取向的目標，可依自身需求挑選。</Text>
        <Hr />
        <Text size="medium">
          { _.find(typeConfigs, ['value', values.type])?.description }
        </Text>
        <Br />
        <Text size="medium">點擊選擇：</Text>
        <div className="d-flex justify-content-between flex-wrap">
          {
            (recommendation.used ? typeConfigs.filter(r => r.orientation === recommendation.orientation) : typeConfigs).map((item) => (
              <Radio name="type" key={item.value} value={item.value} label={item.name} checked={values.type === item.value} onChange={(b, evt) => handleChange(evt)} />
            ))
          }
        </div>
      </Container>

      <Container roundedCorners title={`步驟二：挑選品質`} className={`${phase !== 1 && 'd-none'} m-3 mt-0 bg-marketContainer`}>
        <Heading bottomBr dense size="xlarge" className="pt-0">品質使效率更高</Heading>
        <Text size="medium">更好的裝備品質能讓運動時更舒適，但價格也會稍貴些。</Text>
        <Hr />
        <Text size="medium">
        { _.find(luckyConfigs, ['value', values.lucky])?.description }
        </Text>
        <Br />
        <Text size="medium">點擊選擇：</Text>
        <div className="d-flex justify-content-between flex-wrap">
          {
            luckyConfigs.map((item) => (
              <Radio name="lucky" value={item.value} key={item.value} label={item.name} checked={values.lucky === item.value} onChange={(b, evt) => handleChange(evt)} />
            ))
          }
        </div>
      </Container>

      <Container roundedCorners title={`步驟三：決定難度`} className={`${phase !== 2 && 'd-none'} m-3 mt-0 bg-marketContainer`}>
        <Heading bottomBr dense size="xlarge" className="pt-0">收穫更多</Heading>
        <Text size="medium">更高難度的運動成果能換取價值較高的優惠回饋。</Text>
        <Hr />
        <Text size="medium">
          {
            `因為您選擇了「${_.find(typeConfigs, ['value', values.type])?.name}」目標，
            最低合格次數是${_.get(workSets, [_.find(typeConfigs, ['value', values.type])?.orientation, 'work_min', parseInt(values.level, 10)])}下。
            最高可認列次數是${_.get(workSets, [_.find(typeConfigs, ['value', values.type])?.orientation, 'work_max', parseInt(values.level, 10)])}下。`
          }
        </Text>
        <Br />
        <Text size="medium">點擊選擇：</Text>
        <div className="d-flex justify-content-between flex-wrap">
          {
            (recommendation.used ? levelConfigs.filter(r => r.value === recommendation.level) : levelConfigs).map((item) => (
              <Radio name="level" value={item.value} key={item.value} label={item.name} checked={parseInt(values.level, 10) === item.value} onChange={(b, evt) => handleChange(evt)} />
            ))
          }
        </div>
      </Container>

      <Container roundedCorners title={`步驟四：個性化`} className={`${phase !== 3 && 'd-none'} m-3 mt-0 bg-marketContainer`}>
        <Heading bottomBr dense size="xlarge" className="pt-0">挑選喜歡的樣式</Heading>
        <Hr />
        <Text size="medium">點擊選擇：</Text>
        <div className="d-flex justify-content-between flex-wrap">
          <div className="boxes3">
            {
              wearCollection[profile.gender.toLowerCase()][values.type].map((item, idx) => (
                <div key={`inputs-wear-${idx}`}>
                  <input key={`input-wear-${idx}`} type="radio" name="style" value={idx} id={`wear-${idx}`} defaultChecked={parseInt(values.style, 10) === idx} className="d-none" onChange={(evt) => handleChange(evt)}/>
                  <div className="box" key={`label-wear-${idx}`}>
                    <label htmlFor={`wear-${idx}`}>
                      <img src={item} width={'80%'} className="img-fluid rounded-start" alt={`wear ${idx} img`}  />
                    </label>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </Container>

      { /*<Container roundedCorners title={`STEP 3: Customize`} className={`${phase !== 2 && 'd-none'} m-3 mt-0`}>
        <Heading bottomBr dense size="xlarge" className="pt-0">Deco By You</Heading>
        <Editor setRef={values.drawRef} showBorder={drawerShowBorder} />
        </Container> */ }

      <Container roundedCorners title={`步驟五：確認`} className={`${phase !== 4 && 'd-none'} m-3 mt-0 bg-marketContainer`}>
        <Heading bottomBr dense size="xlarge" className="pt-0">最後確認</Heading>
        <Text size="medium">
          運動目標：{processedValues.type}
          <br />
          品質：{_.find(luckyConfigs, ['value', processedValues.lucky])?.name}
          <br />
          難度：{_.find(levelConfigs, ['value', processedValues.level])?.name}
        </Text>
        { /**<img src={values.draw} className="w-100" alt="draw pic summary"></img> */ }
        <Br />
        <Text className="text-danger" size="medium">付款後將無法退費。</Text>
      </Container>

      <Container roundedCorners title={`步驟六：付款`} className={`${phase !== 5 && 'd-none'} m-3 mt-0 bg-marketContainer`}>
        <Heading bottomBr dense size="xlarge" className="pt-0">付款方式</Heading>
        <IconButton className="w-100 mb-3" color="primary" size="medium" onClick={() => handleSubmit()}>
          <Text color="white" size="large">現金</Text>
        </IconButton>
        <IconButton className="w-100 mb-3" color="disabled" size="medium">
          <Text color="black" size="large">信用卡</Text>
        </IconButton>
        <IconButton className="w-100" color="disabled" size="medium">
          <Text color="black" size="large">Line Pay</Text>
        </IconButton>
      </Container>

      {
        phase < 5 &&
        <div className="position-fixed bottom-0 start-50 translate-middle-x w-100 p-3 pb-5 row g-0">
          <IconButton className={`${phase === 0 && 'd-none'} col`} color="error" size="medium" onClick={() => setPhase(phase - 1)}>
            <Text color="black" size="large">返回</Text>
          </IconButton>
          <IconButton className={`m-0 col`} color="darkGray" size="medium" onClick={() => {
            new Promise((resolve) => {
              if (false && phase === 2) {
                /* setDrawerShowBorder(false);

                setTimeout(() => {
                  const element = ReactDOM.findDOMNode(values.drawRef.current);

                  html2canvas(element, {
                    scrollY: -window.scrollY,
                    useCORS: true,
                  }).then(canvas => {
                    setValues((prevFormData) => ({ ...prevFormData, draw: canvas.toDataURL('image/png', 1.0) }));
                    setDrawerShowBorder(true);
                    resolve();
                  });
                }, 10);*/
              } else {
                resolve();
              }
            })
              .then(() => setPhase(phase + 1));
          }}>
            <Text color="white" size="large">下一步</Text>
          </IconButton>
        </div>
      }
    </>
  );
}

export default Market;
