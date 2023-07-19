import { useState, useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';

import { setDarkModeActivation, Container, IconButton, Button, Text } from "nes-ui-react";

const Market = (props) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    props.setIsMenuVisible(1);
  });

  return (
    <>
      {
        phase === 0 &&
        <Container title={`STEP: ${phase + 1}/3`} className="m-3">

          <IconButton color="success" size="medium" className="w-100 mt-3">
            <Text color="black" size='small' className="ms-2">Next Step</Text>
            <span className="material-symbols-sharp text-dark float-end">step</span>
          </IconButton>
        </Container>
      }
    </>

  );
}

export default Market;
