import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { Button, Container } from "nes-ui-react";

import PortraitWear from '../components/PortraitWear';
import ExcerciseSelectionModal from '../components/ExcerciseSelectionModal';

const Home = ({ layout = null }) => {
  useEffect(() => {
    layout?.({
      type: 'init',
      data: {
        isShowMenu: true,
        backgroundColor: 'transparent',
        // backgroundImage: 'url("https://lh3.google.com/u/0/d/1P4WnKbz4gvArVAwv1TeE2ISYmHR4ASSO=w3016-h1528-iv1")',
        backgroundImage: 'url("background.png")',
        backgroundSize: 'auto 100%',
        backgroundPositionY: '100%'
      }
    });
  }, [layout]);
  
  const navigate = useNavigate();
  const [isExcersizeSelectionOpen, setIsExcersizeSelectionOpen] = useState(false);

  const [values, setValues] = useState({
    gear: null,
    excercise_type: null,
    thing: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  return (
    <>
      <Container title="Dev Window" className="position-fixed top-0 ps-1 pb-1 pe-1 d-none" style={{
        zIndex: 10000
      }}>
        <Link to="exercise/result">
          <Button color="dark" size="small">to /Excercise Result</Button>
        </Link>
      </Container>
      <PortraitWear />

      <div className="position-fixed bottom-0 start-50 translate-middle-x w-100 p-3 pb-5">
        <Link to="/history">
          <Button color="warning" size="medium" fontColor="black" className="w-100 mb-3">查看日誌</Button>
        </Link>

        <Button color="success" size="medium" fontColor="black" className="w-100" onClick={() => setIsExcersizeSelectionOpen(true)}>開始運動</Button>
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
          navigate('/exercise/realtime', {
            state: { ...values }
          });
        }}
      />
    </>
  );
}

export default Home;

