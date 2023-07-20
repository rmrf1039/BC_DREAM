import { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import ReactDOM from 'react-dom';

import Editor from '../components/PixelEditor/Editor'

import { Container, IconButton, Heading, Br, Hr, Text, Radio } from "nes-ui-react";

const Market = (props) => {
  const [phase, setPhase] = useState(0);
  const [drawerShowBorder, setDrawerShowBorder] = useState(true);

  // Initial values
  const [values, setValues] = useState({
    type: "shirt",
    level: "regular",
    drawRef: useRef(),
    draw: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  const handleSubmit = () => {
    alert(JSON.stringify(values));
    console.log(values);
  }

  useEffect(() => {
    if (phase === 4) {
      setValues((v) => {
        const { drawRef, ...rest } = v;
  
        return rest;
      });
    }
  }, [phase]);

  return (
    <>
      <Container title={`STEP 1: Set Goal`} className={`${phase !== 0 && 'd-none'} m-3`}>
        <Heading bottomBr dense size="xlarge" className="pt-0">A Dress Goal</Heading>
        <Text size="medium">Every type of dress has a different goal for the player to achieve.</Text>
        <Hr />
        <Text size="medium">
          {
            values.type === "shirt" && 'The Shirt Goal is achieved for "Good Daily Healh", which means consistency is more important than strength.'
          }
          {
            values.type === "pants" && 'The Pants Goal is achieved for "Muscle and Power", which means the fitness strength will be higher.'
          }
        </Text>
        <Br />
        <Text size="medium">Select your dress type:</Text>
        <div className="d-flex justify-content-evenly">
          <Radio name="type" value="shirt" label="Shirt" checked={values.type === "shirt"} onChange={(b, evt) => handleChange(evt)} />
          <Radio name="type" value="pants" label="Pants" checked={values.type === "pants"} onChange={(b, evt) => handleChange(evt)} />
        </div>
      </Container>

      <Container title={`STEP 2: Decide Quality`} className={`${phase !== 1 && 'd-none'} m-3`}>
        <Heading bottomBr dense size="xlarge" className="pt-0">Better Makes It Faster</Heading>
        <Text size="medium">A good quality dress makes you more comfortable while excercising, but it also means more expensive.</Text>
        <Hr />
        <Text size="medium">
          {
            values.level === "regular" && 'A regular quality has no function.'
          }
          {
            values.level === "advanced" && 'An advanced quality has a 10% bonus for EXP after every excercise. Be noted, you must wear this before workout.'
          }
          {
            values.level === "high tech" && 'A High Tech quality has a 20% bonus for EXP after every excercise. Be noted, you must wear this before workout.'
          }
        </Text>
        <Br />
        <Text size="medium">Choose the quality:</Text>
        <div className="d-flex justify-content-between">
          <Radio name="level" value="regular" label="Regular" checked={values.level === "regular"} onChange={(b, evt) => handleChange(evt)} />
          <Radio name="level" value="advanced" label="Advanced" checked={values.level === "advanced"} onChange={(b, evt) => handleChange(evt)} />
          <Radio name="level" value="high tech" label="High Tech" checked={values.level === "high tech"} onChange={(b, evt) => handleChange(evt)} />
        </div>
      </Container>

      <Container title={`STEP 3: Customize`} className={`${phase !== 2 && 'd-none'} m-3`}>
        <Heading bottomBr dense size="xlarge" className="pt-0">Deco By You</Heading>
        <Editor setRef={values.drawRef} showBorder={drawerShowBorder} />
      </Container>

      <Container title={`STEP 4: Summary`} className={`${phase !== 3 && 'd-none'} m-3`}>
        <Heading bottomBr dense size="xlarge" className="pt-0">Final Check</Heading>
        <Text size="medium">
          Dress Type: {values.type}
          <br />
          Quality: {values.level}
          <br />
          Color:
        </Text>
        <img src={values.draw} className="w-100" alt="draw pic summary"></img>
        <Br />
        <Text className="text-danger" size="medium">It'll be unchangeable after paying.</Text>
      </Container>

      <Container title={`STEP 5: Payment`} className={`${phase !== 4 && 'd-none'} m-3`}>
        <Heading bottomBr dense size="xlarge" className="pt-0">Pay By</Heading>
        <IconButton className="w-100 mb-3" color="primary" size="medium" onClick={() => handleSubmit()}>
          <Text color="black" size="large">Cash</Text>
        </IconButton>
        <IconButton className="w-100 mb-3" color="disabled" size="medium">
          <Text color="black" size="large">Credit Card</Text>
        </IconButton>
        <IconButton className="w-100" color="disabled" size="medium">
          <Text color="black" size="large">Line Pay</Text>
        </IconButton>
      </Container>

      {
        phase < 4 &&
        <div className="position-fixed bottom-0 start-50 translate-middle-x w-100 p-3 pb-5 row g-0">
          <IconButton className={`${phase === 0 && 'd-none'} col`} color="error" size="medium" onClick={() => setPhase(phase - 1)}>
            <Text color="black" size="large">Back</Text>
          </IconButton>
          <IconButton className={`m-0 col`} color="success" size="medium" onClick={() => {
            new Promise((resolve) => {
              if (phase === 2) {
                setDrawerShowBorder(false);

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
                }, 10);
              } else {
                resolve();
              }
            })
              .then(() => setPhase(phase + 1));
          }}>
            <Text color="black" size="large">Next</Text>
          </IconButton>
        </div>
      }
    </>
  );
}

export default Market;
