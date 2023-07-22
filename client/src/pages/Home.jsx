import { useState } from "react";
import { Link } from 'react-router-dom';

import { Button } from "nes-ui-react";

import PortraitWear from '../components/PortraitWear';
import ExcerciseSelection from '../components/ExcerciseSelection';

const Home = () => {
  const [isExcersizeSelectionOpen, setIsExcersizeSelectionOpen] = useState(true);

  return (
    <>
      <PortraitWear />

      <div className="position-fixed bottom-0 start-50 translate-middle-x w-100 p-3 pb-5">
        <Link to="/history">
          <Button color="warning" size="medium" fontColor="black" className="w-100 mb-3">View History</Button>
        </Link>

        <Button color="success" size="medium" fontColor="black" className="w-100" onClick={() => setIsExcersizeSelectionOpen(true)}>Start Excercise</Button>
      </div>

      <ExcerciseSelection open={isExcersizeSelectionOpen} onClose={() => setIsExcersizeSelectionOpen(false)} />
    </>
  );
}

export default Home;

