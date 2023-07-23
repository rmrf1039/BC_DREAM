import { useEffect} from 'react'
import { Routes, Route } from 'react-router-dom';

import { useAccount } from 'wagmi'

import { setDarkModeActivation } from 'nes-ui-react';

import Layout from './templates/Layout';

import WalletConnect from './pages/WalletConnect';
import NotFound from './pages/NotFound';

import Home from './pages/Home';
import Market from './pages/Market';

import PersonalInfo from './pages/PersonalInfo';
import Profile from './pages/Profile';

import Bag from './pages/Bag';
import WearDetail from './pages/WearDetail';
import Transfer from './pages/Transfer';

import ExerciseResult from './pages/ExerciseResult';
import ExerciseModel3D from './pages/ExerciseModel3D';
import ExerciseRealTime from './pages/ExerciseRealTime';
import Coupon from './pages/Coupon';
import CouponExchange from './pages/CouponExchange';
import History from './pages/History';
import ExerciseInstruction from "./pages/ExerciseInstruction";

export default function App() {
  const { isConnected } = useAccount()

  useEffect(() => {
    setDarkModeActivation(0);
  });

  // Router registry with metamask loggin state check
  return (
    <div id="App">
      { isConnected
        ? <Routes>
            <Route element={<Layout  />}>
              <Route index element={<Home />} />
              <Route path='market' element={<Market />} />
              <Route path='bag' element={<Bag />} />
              <Route path='wear' element={<WearDetail />} />
              <Route path='transfer' element={<Transfer />} />
              <Route path='history' element={<History />} />

              <Route path='register' element={<PersonalInfo />} />
              <Route path='profile' element={<Profile />} />
              <Route path='person_info' element={<PersonalInfo />} />

              <Route path='exercise/'>
                <Route path='realtime' element={<ExerciseRealTime />} />
                <Route path='result' element={<ExerciseResult />} />
                <Route path='model3D' element={<ExerciseModel3D />} />
                <Route path='instruction' element={<ExerciseInstruction />} />
              </Route>

              <Route path='coupon/' >
                <Route index element={<Coupon />} />
                <Route path='exchange' element={<CouponExchange />} />
              </Route>
            </Route>

            <Route path='*' element={<NotFound />} />
          </Routes>
      : <WalletConnect />
     }
    </div>
  );
}
