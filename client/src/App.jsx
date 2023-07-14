import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { useEth } from "./contexts/EthContext/EthProvider";

import Layout from './templates/Layout';

import MetamaskSetup from './pages/MetamaskSetup';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Market from './pages/Market';

import PersonalInfo from './pages/PersonalInfo';
import Bag from './pages/Bag';
import NotFound from './pages/NotFound';

import ExerciseChoosing from './pages/ExerciseChoosing';
import ExerciseResult from './pages/ExerciseResult';
import ExerciseModel3D from './pages/ExerciseModel3D';
import ExerciseRealTime from './pages/ExerciseRealTime';
import CouponMarket from './pages/CouponMarket';
import CouponExchange from './pages/CouponExchange';
import History from './pages/History';
import CouponKeeper from './pages/CouponKeeper';
import ExerciseInstruction from "./pages/ExerciseInstruction";

import Test from './pages/Test';

export default function App() {
  // Eth Service Example
  const [isMetamaskLogged, setIsMetamaskLogged] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const ethService = useEth();

  useEffect(() => {
    if (ethService.state.web3 && ethService.state.accounts) {
      setIsMetamaskLogged(true);
    } else {
      setIsMetamaskLogged(true); //default false
    }
  }, [ethService, setIsMetamaskLogged]);

  // Router registry with metamask loggin state check
  return (
    <div id="App">
      { isMetamaskLogged
        ? <Routes>
            <Route element={<Layout isMenuVisible={isMenuVisible}  />}>
              <Route index element={<Home />} />
              <Route path='test' element={<Test />} />
              <Route path='register' element={<PersonalInfo setIsMenuVisible={setIsMenuVisible} />} />
              <Route path='profile' element={<PersonalInfo setIsMenuVisible={setIsMenuVisible} />} />
              <Route path='market' element={<Market setIsMenuVisible={setIsMenuVisible} />} />
              <Route path='bag' element={<Bag setIsMenuVisible={setIsMenuVisible} />} />
              <Route path='history' element={<History setIsMenuVisible={setIsMenuVisible} />} />

              <Route path='exercise/'>
                <Route index element={<ExerciseChoosing setIsMenuVisible={setIsMenuVisible} />} />
                <Route path='realtime' element={<ExerciseRealTime setIsMenuVisible={setIsMenuVisible} />} />
                <Route path='result' element={<ExerciseResult setIsMenuVisible={setIsMenuVisible} />} />
                <Route path='model3D' element={<ExerciseModel3D setIsMenuVisible={setIsMenuVisible} />} />
                <Route path='instruction' element={<ExerciseInstruction setIsMenuVisible={setIsMenuVisible} />} />

              </Route>

              <Route path='coupon/' >
                <Route index element={<CouponMarket setIsMenuVisible={setIsMenuVisible} />} />
                <Route path='keeper' element={<CouponKeeper setIsMenuVisible={setIsMenuVisible} />} />
                <Route path='exchange' element={<CouponExchange setIsMenuVisible={setIsMenuVisible} />} />
              </Route>
            </Route>

            <Route path='*' element={<NotFound />} />
          </Routes>
      : <MetamaskSetup />
     }
    </div>
  );
}
