import { useState, useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';

import { setDarkModeActivation, Container, IconButton, Button, Text } from "nes-ui-react";

const Market = (props) => {
  const [phase, setPhase] = useState(0);
  
  return (
    <>
      {
        phase >= 0 &&
        <Container title={`STEP 1: Selection`} className="m-3">
        </Container>
      }
      {
        phase >= 1 &&
        <Container title={`STEP 2: Customize`} className="m-3">
        </Container>
      }
      {
        phase >= 2 &&
        <Container title={`STEP 3: Payment`} className="m-3">
        </Container>
      }

      <div className="position-fixed bottom-0 start-50 translate-middle-x w-100 p-3 pb-5">
        <IconButton color="success" size="medium" className="w-100">
          <Text color="black" size="large">Next Step</Text>
        </IconButton>
      </div>

    </>

  );
}

export default Market;
