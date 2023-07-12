import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { useEth } from "./contexts/EthContext/EthProvider";

import Layout from './templates/Layout';

import MetamaskSetup from './pages/MetamaskSetup';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Market from './pages/Market';

import Register from './pages/Register';
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
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='test' element={<Test />} />
              <Route path='register' element={<Register />} />
              <Route path='profile' element={<Profile />} />
              <Route path='market' element={<Market />} />
              <Route path='bag' element={<Bag />} />
              <Route path='history' element={<History />} />

              <Route path='exercise/'>
                <Route index element={<ExerciseChoosing />} />
                <Route path='realtime' element={<ExerciseRealTime />} />
                <Route path='result' element={<ExerciseResult />} />
                <Route path='model3D' element={<ExerciseModel3D />} />
                <Route path='instruction' element={<ExerciseInstruction />} />

              </Route>

              <Route path='coupon/' >
                <Route index element={<CouponMarket />} />
                <Route path='keeper' element={<CouponKeeper />} />
                <Route path='exchange' element={<CouponExchange />} />
              </Route>
            </Route>

            <Route path='*' element={<NotFound />} />
          </Routes>
      : <MetamaskSetup />
     }
    </div>
  );
}
