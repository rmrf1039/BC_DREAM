import { useReducer, useEffect} from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAccount } from 'wagmi'
import { useAxios } from './providers/AxiosProvider';

import { setDarkModeActivation } from 'nes-ui-react';

import Layout from './templates/Layout';

import WalletConnect from './pages/WalletConnect';
import NotFound from './pages/NotFound';

import Home from './pages/Home';
import Market from './pages/Market';

import PersonalInfo from './pages/PersonalInfo';
import Profile from './pages/Profile';

import Bag from './pages/Bag';
import GearDetail from './pages/GearDetail';
import Transfer from './pages/Transfer';

import ExerciseResult from './pages/ExerciseResult';
import Coupon from './pages/Coupon';
import CouponExchange from './pages/CouponExchange';
import History from './pages/History';
import ExerciseRealtime from "./pages/ExerciseRealtime";

export default function App() {
  const { pathname } = useLocation();
  const { isConnected } = useAccount()
  const { state } = useAxios()
  const navigate = useNavigate();

  const [layoutState, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'init': {
        return {
          isShowBack: false,
          isShowMenu: false,
          title: null,
          backgroundColor: '#fff',
          backgroundImage: null,
          backgroundSize: '100% auto',
          backgroundPositionY: '95%',
          ...action.data,
        };
      }

      default: {
        throw Error('Unknown action.');
      }
    }
  }, {
    isShowBack: false,
    isShowMenu: false,
    title: null,
    backgroundColor: '#fff',
    backgroundImage: null,
  });

  useEffect(() => {
    setDarkModeActivation(0);
  });

  useEffect(() => {
    if (state.isNonced && !state.isRegistered) {
      navigate("/register");
    } else if (state.isNonced && state.isLogged && pathname === "/register") {
      navigate("/");
    }
  }, [state, navigate, pathname]);

  // Router registry with metamask loggin state check
  return (
    <div id="App">
      { 
        isConnected && (state.isLogged || !state.isRegistered)
        ? 
        <Routes>
          <Route element={<Layout state={layoutState} dispatch={dispatch} />}>
            {
              state.isLogged
              ?
              <>
                <Route index element={<Home layout={dispatch} />} />
                <Route path='bag' element={<Bag layout={dispatch} />} />
                <Route path='gear' element={<GearDetail layout={dispatch} />} />
                <Route path='transfer' element={<Transfer layout={dispatch} />} />
                <Route path='history' element={<History layout={dispatch} />} />
                <Route path='profile' element={<Profile layout={dispatch} />} />
                <Route path='person_info' element={<PersonalInfo layout={dispatch} />} />

                <Route path='exercise/'>
                  <Route path='result' element={<ExerciseResult layout={dispatch} />} />
                  <Route path='realtime' element={<ExerciseRealtime layout={dispatch} />} />
                </Route>

                <Route path='market' element={<Market layout={dispatch} />} />
                <Route path='coupon/' >
                  <Route index element={<Coupon layout={dispatch} />} />
                  <Route path='exchange' element={<CouponExchange layout={dispatch} />} />
                </Route>
              </>
              :
              <Route path='register' element={<PersonalInfo layout={dispatch} register />} />
            }    
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
        :
        <WalletConnect />
     }
    </div>
  );
}
