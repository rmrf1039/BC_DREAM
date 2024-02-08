import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAxios } from '../providers/AxiosProvider';

import { wearImgs } from './WearCollect';
import NakedPortrait from '../assets/img/gear/naked.png';

function useSingleAndDoubleClick(actionSimpleClick, actionDoubleClick, delay = 250) {
  const [click, setClick] = useState(0);

  useEffect(() => {
      const timer = setTimeout(() => {
          // simple click
          if (click === 1) actionSimpleClick?.();
          setClick(0);
      }, delay);

      // the duration between this click and the previous one
      // is less than the value of delay = double-click
      if (click === 2) actionDoubleClick?.();

      return () => clearTimeout(timer);
      
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [click]);

  return () => setClick(prev => prev + 1);
}

const PortraitWear = () => {
  const { profile, updateProfile } = useAxios()
  const navigate = useNavigate();

  const portraitWidth = 250;

  useEffect(() => {
    updateProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="d-flex flex-column align-items-center mt-2">
        <div className="position-relative portrait-container">
          <img src={NakedPortrait} width={portraitWidth} alt="naked person" style={{
            marginTop: "calc((100% / 18) * 3)",
          }} />
          <img
            src={wearImgs[profile.dress[0]?.type]}
            width={portraitWidth}
            alt="hair"
            className={`${!profile.dress[0] && 'd-none'} position-absolute top-0 start-50 translate-middle-x`}
            onClick={useSingleAndDoubleClick(null, () => navigate(`/gear?tokenId=${profile.dress[0].token_id}`))}
          />
          <img
            src={wearImgs[profile.dress[1]?.type]}
            width={portraitWidth} alt="cloth"
            className={`${!profile.dress[1] && 'd-none'} position-absolute start-50 translate-middle-x`}
            style={{
              top: "calc(100%/39 * 12)"
            }}
            onClick={useSingleAndDoubleClick(null, () => navigate(`/gear?tokenId=${profile.dress[1].token_id}`))}
          />
          <img
            src={wearImgs[profile.dress[2]?.type]}
            width={portraitWidth}
            alt="pants"
            className={`${!profile.dress[2] && 'd-none'} position-absolute start-50 translate-middle-x`}
            style={{
              top: "calc(100%/39 * 23)"
            }}
            onClick={useSingleAndDoubleClick(null, () => navigate(`/gear?tokenId=${profile.dress[2].token_id}`))}
          />
          <img
            src={wearImgs[profile.dress[3]?.type]}
            width={portraitWidth}
            alt="shoes"
            className={`${!profile.dress[3] && 'd-none'} position-absolute start-50 translate-middle-x`}
            style={{
              top: "calc(100%/39 * 30)"
            }}
            onClick={useSingleAndDoubleClick(null, () => navigate(`/gear?tokenId=${profile.dress[3].token_id}`))}
          />
        </div>
      </div>
    </div>
  )
}

export default PortraitWear;