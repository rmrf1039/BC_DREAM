import { Text, Modal, Header, Spacer, ModalContent, Footer, IconButton, PixelIcon, Heading } from "nes-ui-react";

const ExcerciseSelection = ({ open, onClose, data }) => {
  return (
    <Modal className="top-50 start-50 translate-middle" open={open} onClose={onClose}>
      <Header>
        <Spacer />
        <Heading dense size="large">Log</Heading>
        <Spacer />
      </Header>
      <ModalContent>
        {
          data &&
          `${data.date.getFullYear()} / ${data.date.getMonth()} / ${data.date.getDate()}`
        }
      </ModalContent>
      <Footer>
        <Spacer />
        <IconButton color="error" onClick={onClose}>

          <Text size='small'>Close</Text>
          <PixelIcon name="pixelicon-checkmark" size='small' />
        </IconButton>
      </Footer>
    </Modal>
  )
}

export default ExcerciseSelection;