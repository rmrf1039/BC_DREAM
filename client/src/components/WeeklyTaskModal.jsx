import { Text, Button, Modal, Header, Spacer, ModalContent, IconButton, PixelIcon, Heading, List } from "nes-ui-react";
import { thingImgs } from './ThingsIconCollect';
import congratsStar from '../assets/img/congraduation.png';

const WeeklyTaskModal = ({open, onClose, data}) => {
  return (
    <Modal className="top-50 start-50 translate-middle" open={open}>
      <Header>
        <Spacer />
        <Heading dense size="large">每週任務</Heading>
        <Spacer />
        <IconButton color="error" size="small" onClick={() => onClose()}>
          <PixelIcon name="pixelicon-close" size='small' />
        </IconButton>
      </Header>
      <ModalContent>
        {
          data?.status === 'DAILY_COMPLETE'
          ?
            <>
              <Text size="large" className="text-center">加油！您已完成本日任務</Text>
              <Text className="mb-2">已累積：</Text>
              <div className="d-flex gap-3">
                {
                  [...Array(data?.count || 6)].map((_, idx) => (
                    <Button key={idx} size="small" color="success" style={{ color: '#000' }}><Text size="medium" className="m-0"><>{idx + 1}</>天</Text></Button>
                  ))
                }
              </div>
            </>
          :
            <>
              <img src={congratsStar} width="70%" className="d-block m-auto mb-3" alt="congratulation" />
              <Text size="large" className="text-center">恭喜完成本週任務</Text>
              <Text size="medium" className="text-center">以下是獲得之獎勵</Text>
              <div className="boxes1 w-25 m-auto d-block mb-3">
                <div className="box p-1">
                  <img src={thingImgs[data?.thing?.type]} alt="nft" className="w-100" />
                  <span>{data?.thing?.amount}</span>
                </div>
              </div>
            </>
        }
      </ModalContent>
    </Modal>
  );
};

export default WeeklyTaskModal;