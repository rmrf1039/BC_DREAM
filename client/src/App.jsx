import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { useEth } from "./providers/WagmiProvider";

import { useAccount } from 'wagmi'

import Layout from './templates/Layout';

import MetamaskSetup from './pages/MetamaskSetup';
import NotFound from './pages/NotFound';

import Home from './pages/Home';
import Market from './pages/Market';

import PersonalInfo from './pages/PersonalInfo';
import Profile from './pages/Profile';

import Bag from './pages/Bag';
import WearDetail from './pages/WearDetail';
import Transfer from './pages/Transfer';


import ExerciseChoosing from './pages/ExerciseChoosing';
import ExerciseResult from './pages/ExerciseResult';
import ExerciseModel3D from './pages/ExerciseModel3D';
import ExerciseRealTime from './pages/ExerciseRealTime';
import CouponMarket from './pages/CouponMarket';
import CouponExchange from './pages/CouponExchange';
import History from './pages/History';
import ExerciseInstruction from "./pages/ExerciseInstruction";

import Test from './pages/Test';

export default function App() {
  const { isConnected } = useAccount()

  // Router registry with metamask loggin state check
  return (
    <div id="App">
      { isConnected
        ? <Routes>
            <Route element={<Layout  />}>
              <Route index element={<Home />} />
              <Route path='test' element={<Test />} />
              <Route path='market' element={<Market />} />
              <Route path='bag' element={<Bag />} />
              <Route path='wear' element={<WearDetail />} />
              <Route path='transfer' element={<Transfer />} />
              <Route path='history' element={<History />} />

              <Route path='register' element={<PersonalInfo />} />
              <Route path='profile' element={<Profile />} />
              <Route path='person_info' element={<PersonalInfo />} />

              <Route path='exercise/'>
                <Route index element={<ExerciseChoosing />} />
                <Route path='realtime' element={<ExerciseRealTime />} />
                <Route path='result' element={<ExerciseResult />} />
                <Route path='model3D' element={<ExerciseModel3D />} />
                <Route path='instruction' element={<ExerciseInstruction />} />

              </Route>

              <Route path='coupon/' >
                <Route index element={<CouponMarket />} />
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
