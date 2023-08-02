import { useState } from "react";
import { Link } from 'react-router-dom';

import { Button, Container } from "nes-ui-react";

import PortraitWear from '../components/PortraitWear';
import ExcerciseSelectionModal from '../components/ExcerciseSelectionModal';

const Home = () => {
  const [isExcersizeSelectionOpen, setIsExcersizeSelectionOpen] = useState(false);

  const [values, setValues] = useState({
    wear: null,
    excercise_type: null
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  return (
    <>
      <Container title="Dev Window" className="d-none position-fixed top-0 ps-1 pb-1 pe-1" style={{
        zIndex: 10000
      }}>
        <Link to="exercise/result">
          <Button color="dark" size="small">to /Excercise Result</Button>
        </Link>
      </Container>
      <PortraitWear />

      <div className="position-fixed bottom-0 start-50 translate-middle-x w-100 p-3 pb-5">
        <Link to="/history">
          <Button color="warning" size="medium" fontColor="black" className="w-100 mb-3">View History</Button>
        </Link>

        <Button color="success" size="medium" fontColor="black" className="w-100" onClick={() => setIsExcersizeSelectionOpen(true)}>Start Workout</Button>
      </div>

      <ExcerciseSelectionModal
        open={isExcersizeSelectionOpen}
        onClose={() => {
          setIsExcersizeSelectionOpen(false);
          setValues({});
        }}
        values={values}
        setValues={handleChange}
        startTask={() => {
          setIsExcersizeSelectionOpen(false);
          alert("start excercise");
          console.log(values);
        }}
      />
    </>
  );
}

export default Home;

