import { useState } from "react";

import { Text, Button, Radio, Modal, Header, Spacer, ModalContent, IconButton, PixelIcon, Heading } from "nes-ui-react";

const ExcerciseSelectionModal = ({ open, onClose, values, setValues, startTask }) => {
  const [phase, setPhase] = useState(0);

  const loadedWears = [{
    tokenId: 0,
    src: "https://i.seadn.io/gcs/files/84cdc84313024124e63e677b017f3a34.png?auto=format&dpr=1&w=750"
  }, {
    tokenId: 1,
    src: "https://i.seadn.io/gcs/files/1986a8a71a31ce0221a96c2b9aef87bb.png?auto=format&dpr=1&w=750"
  }, {
    tokenId: 2,
    src: "https://i.seadn.io/gcs/files/5de47d7599197e428d9425087a2027f0.png?auto=format&dpr=1&w=750"
  }]

  const setWearValue = (evt) => {
    setValues(evt);
    setPhase(1);
  }

  return (
    <Modal className="top-50 start-50 translate-middle" open={open}>
      <Header>
        <Spacer />
        <Heading dense size="large">Setup</Heading>
        <Spacer />
        <IconButton color="error" size="small" onClick={() => {
          setPhase(0);
          onClose();
        }}>
          <PixelIcon name="pixelicon-close" size='small' />
        </IconButton>
      </Header>
      <ModalContent>
        <div className={`${phase !== 0 && 'd-none'}`}>
          <Text size="large" className="text-center text-gray">Click the wear for the workout this time.</Text>
          <div className="d-flex justify-content-center">
            <div className="boxes3">
              {
                loadedWears.map(item => (
                  <div className="box" key={item.tokenId}>
                    <input type="radio" name="wear" value={item.tokenId} id={`wear-${item.tokenId}`} className="d-none" onChange={(evt) => setWearValue(evt)} />
                    <label htmlFor={`wear-${item.tokenId}`}>
                      <img src={item.src} className="img-fluid rounded-start" alt={`wear ${item.tokenId} img`} />
                    </label>
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        <div className={`${phase !== 1 && 'd-none'}`}>
          <Text size="large" className="text-center text-gray">Click the type of excercise for this workout.</Text>
          <div className="d-flex justify-content-between flex-wrap h5">
            <Radio name="excercise_type" value="push_up" label="Push up" checked={values.excercise_type === "push_up"} onChange={(b, evt) => setValues(evt)} />
            <Radio name="excercise_type" value="squat" label="Squat" checked={values.excercise_type === "squat"} onChange={(b, evt) => setValues(evt)} />
            <Radio name="excercise_type" value="sit_up" label="Sit up" checked={values.excercise_type === "sit_up"} onChange={(b, evt) => setValues(evt)} />
          </div>
        </div>
        {
          values.excercise_type != null &&
          <Button size="large" color="success" className="w-100 mt-3" onClick={startTask}>Start</Button>
        }
      </ModalContent>
    </Modal>
  )
}

export default ExcerciseSelectionModal;