import { useEffect, useState } from "react";
import { useAxios } from '../providers/AxiosProvider';
import { sportNameTranslation, thingsTranslation } from './translation'
import axios from "axios";

import { Text, Button, Radio, Modal, Header, Spacer, ModalContent, IconButton, PixelIcon, Heading, List } from "nes-ui-react";
import { wearImgs } from './WearIconCollect';
import { thingImgs } from './ThingsIconCollect';

const ExcerciseSelectionModal = ({ open, onClose, values, setValues, startTask }) => {
  const { profile, updateProfile } = useAxios()

  const [phase, setPhase] = useState(0);
  const [gears, setGears] = useState(null);
  const [things, setThings] = useState(null);

  const onConfirm = () => {
    if (phase === 1 && !things) {
      setPhase(3);
      return;
    }

    setPhase(phase + 1);
  };

  useEffect(() => {
    // Update to the nest profile
    updateProfile()
    .then(() => {
      // Update only when the modal is open
      if (open) {
        // Check whether or not the target is set
        // If target is already set, then only update the Things status
        if (profile?.target) {
          // If the target is already set, then skip the NFT selection phase
          setPhase(1);

          axios.get('/api/things/')
          .then((res) => {
            if (res.data?.length > 0) setThings(res.data);
          });
        } else {
          axios.get('/api/bag/')
          .then((res) => {
            if (res.data?.gears?.length > 0) setGears(res.data.gears);
            if (res.data?.things?.length > 0) setThings(res.data.things);
          });
        }
      } else {
        // otherwise, set things to null for next open
        setThings(null);
        setGears(null);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Modal className="top-50 start-50 translate-middle" open={open}>
      <Header>
        <Spacer />
        <Heading dense size="large">設定</Heading>
        <Spacer />
        <IconButton color="error" size="small" onClick={() => {
          setPhase(0);
          onClose();
        }}>
          <PixelIcon name="pixelicon-close" size='small' />
        </IconButton>
      </Header>
      <ModalContent>
        <div className={`${(phase !== 0 || profile.target) && 'd-none'}`}>
          <Text size="medium" className="text-center text-gray">您還未指定運動目標，請選擇：</Text>
          <div className="d-flex justify-content-center">
            <div className="boxes9">
              {
                (gears || []).map((item) => (
                  <div key={`inputs-wear-${item.token_id}`}>
                    <input key={`input-wear-${item.token_id}`} type="radio" name="gear" value={item.token_id} id={`wear-${item.token_id}`} defaultChecked={parseInt(values.gear, 10) === item.token_id} className="d-none" onChange={(evt) => setValues(evt)}/>
                    <div className="box" key={`label-wear-${item.token_id}`}>
                      <label htmlFor={`wear-${item.token_id}`}>
                        <img src={wearImgs[item.type]} width={'80%'} className="img-fluid rounded-start" alt={`wear ${item.token_id} img`}  />
                      </label>
                    </div>
                  </div>
                ))
              }
              {[...Array((gears || []).length < 9 ? 9 - (gears || []).length : 3 - (gears.length % 3))].map((x, i) =>
                <div className="box" key={i}></div>
              )}
            </div>
          </div>
        </div>

        <div className={`${phase !== 1 && 'd-none'}`}>
          <Text size="medium" className="text-center text-gray">點擊選擇本次運動項目：</Text>
          <div className="d-flex justify-content-between flex-wrap h5">
            <Radio name="excercise_type" value="push_up" label="伏地挺身" checked={values.excercise_type === "push_up"} onChange={(b, evt) => setValues(evt)} />
            <Radio name="excercise_type" value="squat" label="深蹲" checked={values.excercise_type === "squat"} onChange={(b, evt) => setValues(evt)} />
            <Radio name="excercise_type" value="bicep_curl" label="二頭彎舉" checked={values.excercise_type === "bicep_curl"} onChange={(b, evt) => setValues(evt)} />
          </div>
        </div>

        <div className={`${phase !== 2 && 'd-none'}`}>
          <Text size="medium" className="text-center text-gray">（非必選）使用補給品於本次運動</Text>
          <div className="d-flex justify-content-center">
            <div className="boxes3">
              {
                (things || []).map((item) => (
                  <div key={`inputs-thing-${item.type}`}>
                    <input key={`input-thing-${item.type}`} type="radio" name="thing" value={item.type} id={`thing-${item.type}`} defaultChecked={values.thing === item.type} className="d-none" onChange={(evt) => setValues(evt)}/>
                    <div className="box" key={`label-thing-${item.type}`}>
                      <label htmlFor={`thing-${item.type}`}>
                        <img src={thingImgs[item.type]} width={'80%'} className="img-fluid rounded-start" alt={`thing ${item.type} img`}  />
                        <span>{ item.amount }</span>
                      </label>
                    </div>
                  </div>
                ))
              }
              {[...Array(3 - (things || []).length)].map((x, i) =>
                <div className="box" key={i}></div>
              )}
            </div>
          </div>
        </div>
        <div className={`${phase !==3 && 'd-none'}`}>
          <Text size="large" className="text-center text-gray">請確認以下資訊：</Text>
          <List styleType='circle'>
              <li>指定裝備序號：{ profile.target?.token_id || values.gear }</li>
              <li>運動類型：{ sportNameTranslation(values.excercise_type) }</li>
              <li>使用補給品：{ thingsTranslation(values.thing)}</li>
          </List>
        </div>
        {
          (
            (phase === 0 && values.gear )
            || (phase === 1 && values.excercise_type )
            || (phase === 2 )
          )
          ?
          <Button size="large" color="success" className="w-100 mt-3" onClick={onConfirm}>下一步</Button>
          :
            phase === 3 && 
            <Button size="large" color="success" className="w-100 mt-3" onClick={startTask}>開始</Button>
        }
      </ModalContent>
    </Modal>
  )
}

export default ExcerciseSelectionModal;