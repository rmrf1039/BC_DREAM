import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import { wearImgs } from '../components/WearIconCollect';
import energyDrinkIcon from '../assets/img/things/energy_drink.png';
import proteinIcon from '../assets/img/things/protein_powder.png';
import dumbbelIcon from '../assets/img/things/dumbbel.png';
import ventIcon from '../assets/img/vent.png';

import { Container } from "nes-ui-react";

import '../assets/scss/inventory.scss';

const Bag = ({ layout = null }) => {
  useEffect(() => {
    layout?.({
      type: 'init',
      data: {
        isShowMenu: true,
        title: '背包',
        backgroundColor: '#EFEFEF',
      }
    });
  }, [layout]);

  const [gears, setGears] = useState([]);
  const [things, setThings] = useState([]);

  useEffect(() => {
    axios.get('api/bag/')
    .then((res) => {
      setGears(res.data?.gears);
      setThings(res.data?.things);
    });
  }, []);

  return (
    <>
      <Container roundedCorners className="m-3 mt-0 inventory">
        <h1>裝備</h1>
        <div className="boxes9 mb-4">
          {
            (gears || []).map((item) => (
              <Link key={item.token_id} to={`/gear?tokenId=${item.token_id}`} state={{ data: item }}>
                <div className="box">
                  <img src={wearImgs[item.type]} width={'80%'} className="img-fluid rounded-start" alt={item.token_id} />
                </div>
              </Link>
            ))
          }
          {[...Array((gears || []).length < 9 ? 9 - (gears || []).length : 3 - (gears.length % 3))].map((x, i) =>
            <div className="box" key={i}></div>
          )}
        </div>
        <h1>補給品</h1>
        <div className="boxes3">
          <div className="box">
            <img src={energyDrinkIcon} width={'80%'} className="img-fluid rounded-start" alt="energyDrinkIcon" />
            <span>{ things[0]?.amount || 0 }</span>
          </div>
          <div className="box">
            <img src={proteinIcon} width={'80%'} className="img-fluid rounded-start" alt="proteinIcon" />
            <span>{ things[1]?.amount || 0 }</span>
          </div>
          <div className="box">
            <img src={dumbbelIcon} width={'80%'} className="img-fluid rounded-start" alt="dumbbelIcon" />
            <span>{ things[2]?.amount || 0 }</span>
          </div>
        </div>
      </Container>
      <div className="p-3 d-flex justify-content-center">
        <img src={ventIcon} width={'70%'} alt="vent icon"/>
      </div>
    </>
  );
}

export default Bag;
