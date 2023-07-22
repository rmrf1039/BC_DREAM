import { useState } from "react";

import { Text, Button, Modal, Header, Spacer, ModalContent, Footer, IconButton, PixelIcon, Heading } from "nes-ui-react";

const ExcerciseSelection = ({open, onClose}) => {
  const [values, setValues] = useState({
    wear: null,
    excercise: null
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  return (
    <Modal className="top-50 start-50 translate-middle" open={open} onClose={onClose}>
        <Header>
          <Spacer />
          <Heading dense size="large">Configuration</Heading>
          <Spacer />
        </Header>
        <ModalContent>This is written inside of a &lt;ModalContent&gt; component just to keep the correct distance to all sides of the modal: The &lt;Header&gt; which is above and the &lt;Footer&gt; which is holding the action buttons.</ModalContent>
        <Footer>
          <IconButton color="error" onClick={onClose}>
            <PixelIcon name="pixelicon-close" size='small' />
            <Text size='small'>Cancel</Text>
          </IconButton>
          <Spacer />
          <IconButton color="success" onClick={onClose}>

            <Text size='small'>Accept</Text>
            <PixelIcon name="pixelicon-checkmark" size='small' />
          </IconButton>
        </Footer>
      </Modal>
  )
}

export default ExcerciseSelection;