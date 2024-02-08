import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useAxios } from '../providers/AxiosProvider';
import axios from 'axios';
import _ from 'lodash';

import { wearImgs } from '../components/WearIconCollect';
import { Container, Text, Progress, IconButton, Menu, Heading, Button, Separator, Hr } from "nes-ui-react";

import GearHistoryModal from '../components/GearHistoryModal';

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const GearDetail = ({ layout = null }) => {
  useEffect(() => {
    layout?.({
      type: 'init',
      data: {
        isShowBack: true,
        isShowMenu: false,
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout]);

  const query = useQuery();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { profile, updateProfile } = useAxios();
  
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [showGearHistoryModal, setShowGearHistoryModal] = useState(false)
  const [data, setData] = useState();
  const qualityLabel = useMemo(() => {
    if (!data) return;

    if (data.lucky === 1) {
      return '一般';
    } else if (data.lucky > 1 && data.lucky < 1.2) {
      return '進階';
    } else if (data.lucky >= 1.2 && data.lucky < 1.4) {
      return '高科技';
    } else {
      return '外星科技';
    }
  }, [data]);

  const dress = () => {
    axios.put(`/api/dress/${data.token_id}`)
    .then(() => updateProfile())
  };

  const undress = () => {
    axios.delete(`/api/dress/${data.token_id}`)
    .then(() => updateProfile())
  }

  const setAsTarget = () => {
    axios.put(`/api/target/${data.token_id}`)
    .then(() => updateProfile());
  }

  const couponRequest = () => {
    const arr = ['line', 'mc', 'nike', 'adidas', 'worldgym'];

    axios.put(`/api/coupon/${data.token_id}`, {
      coupon: data.trial ? 'gymboy' : arr[(Math.floor(Math.random() * arr.length))]
    })
    .then(() => navigate('/coupon'));
  };

  useEffect(() => {
    if (state) {
      setData(state.data);
      return;
    }

    if (!query.get('tokenId') || query.get('tokenId') === '') navigate('/bag');

    axios.get(`api/gears/${query.get('tokenId')}`)
    .then((res) => {
      setData(res.data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {
        data &&
        <>
          <Container roundedCorners className="m-3 mt-0 inventory">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Text size="large" className="text-gray m-0">{
                data.exp / data.goal_exp >= 1 ?
                  '滿級'
                :
                  '等級.' + Math.floor(data.exp/data.goal_exp * 100) + '/100'
              }</Text>
              <div className="position-relative">
                <Button borderInverted color="warning" size="small" fontColor="black" onClick={() => setShowMoreMenu(true)}>操作</Button>
                <Menu className="bg-light end-0" open={showMoreMenu} modal onClose={() => setShowMoreMenu(false)}>
                  {
                    (!data.coupon && data.exp / data.goal_exp >= 1) &&
                    <>
                      <IconButton color="success" size="small" onClick={couponRequest}>
                        <span className="material-symbols-sharp">confirmation_number</span>
                        <Text size="small">兌換</Text>
                      </IconButton>
                      <Separator horizontal />
                    </>
                  }
                  {
                    !data.trial &&
                    <IconButton color="error" size="small" onClick={() => navigate(`/transfer?tokenId=${data.token_id}`)}>
                      <span className="material-symbols-sharp">currency_exchange</span>
                      <Text size="small">轉移</Text>
                    </IconButton>
                  }
                  <IconButton color="primary" size="small" onClick={() => {
                    setShowMoreMenu(false);
                    setShowGearHistoryModal(true);
                  }}>
                    <span className="material-symbols-sharp">analytics</span>
                    <Text size="small">查看</Text>
                  </IconButton>
                </Menu>
              </div>
            </div>
            <div className="boxes1 mb-3">
              <div className="box p-3">
                <img src={wearImgs[data.type]} alt="nft" className="w-100" />
              </div>
            </div>
            <div className="mb-3 d-flex flex-column justify-content-center align-items-center">
              <Heading bottomBr dense size="xlarge" className="p-0 text-center text-decoration-none">{qualityLabel} 裝備 { data.trial && '<試用>' }</Heading>
            </div>
            <div className="mb-3">
              <Text size="medium" className="mb-1">每次最高可獲經驗值:{data.max_exp}</Text>
              <Text size="medium" className="mb-1">幸運加乘:{data.lucky}</Text>
              <Progress value={data.lucky - 1} max=".5" color="warning" />
            </div>
            <Hr />
            {
              !profile.target && 
              <Button color="success" size="medium" className="w-100 mb-3" onClick={setAsTarget}>設定為目標</Button>
            }
            {
              Object.keys(_.keyBy(profile.dress, 'type')).includes(data.type)
              ?
              <Button color="error" size="medium" className="w-100" onClick={undress}>脫卸</Button>
              :
              <Button color="primary" size="medium" className="w-100" onClick={dress}>裝備</Button>
            }
          </Container>
          <GearHistoryModal token_id={data.token_id} open={showGearHistoryModal} onClose={() => setShowGearHistoryModal(false)}></GearHistoryModal>
        </>
      }
    </>
  );
}

export default GearDetail;

