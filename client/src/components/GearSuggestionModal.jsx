import { Text, Modal, Header, List, ModalContent, IconButton, PixelIcon, Heading } from "nes-ui-react";

const GearSuggestionModal = ({data, open, onCancel, onConfirm }) => {
  const translation = {
    orientation: {
      health: '健康',
      workout: '健身'
    },
    level: {
      1: '初級',
      2: '中級',
      3: '高級',
    }
  }
  return (
    <Modal className="top-50 start-50 translate-middle" open={open}>
      <Header>
        <Heading dense size="large">是否套用建議設定</Heading>
      </Header>
      <ModalContent>
        <Text>該設定是經由您歷史運動軌跡進而計算出的建議值，以避免設定到不適當的運動目標。</Text>
        <List>
          <li>取向：{ translation.orientation[data.orientation] }</li>
          <li>困難度：{ translation.level[data.level] }</li>
        </List>
        <div className="mt-3 d-flex justify-content-between">
          <IconButton color="error" onClick={onCancel}>
            <PixelIcon name="pixelicon-close" size='small' color='white' />
            <Text color="black" size="small">否</Text>
          </IconButton>
          <IconButton className="m-0" color="success" onClick={onConfirm}>
            <PixelIcon name="pixelicon-checkmark" size='small' color='white' />
            <Text color="black" size="small">是</Text>
          </IconButton>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default GearSuggestionModal;