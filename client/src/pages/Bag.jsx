//import { } from 'react'
import { Link } from "react-router-dom";

import { useListingWear } from '../contracts/WearContract';

import { Container } from "nes-ui-react";

import '../assets/scss/inventory.scss';

const Bag = () => {
  const data = useListingWear().map(r => {
    return {
      ...r,
      src: "https://i.seadn.io/gcs/files/e65f60618446f5d9897f2d5a97c30e76.png?auto=format&dpr=1&w=750",
    };
  });

  // 之後替換成 fetch 後的 dataset
  /* const data = [{
    src: "https://i.seadn.io/gcs/files/e65f60618446f5d9897f2d5a97c30e76.png?auto=format&dpr=1&w=750",
    tokenId: 1,
  }, {
    src: "https://i.seadn.io/gcs/files/1986a8a71a31ce0221a96c2b9aef87bb.png?auto=format&dpr=1&w=750",
    tokenId: 2,
  }, {
    src: "https://i.seadn.io/gcs/files/84cdc84313024124e63e677b017f3a34.png?auto=format&dpr=1&w=750",
    tokenId: 3,
  }, {
    src: "https://i.seadn.io/gcs/files/5de47d7599197e428d9425087a2027f0.png?auto=format&dpr=1&w=750",
    tokenId: 4,
  }, {
    src: "https://i.seadn.io/gae/eDlHWnyukmwhxHwtsTS2LYQhW1acN6Y_d4rGWiG6_TIYaPGnWroRJrZ3eH60gvu8ai_djia5dx03Ea9wWOJOZgV-mOS_ffv7PVSwtw?auto=format&dpr=1&w=750",
    tokenId: 5,
  }, {
    src: "https://i.seadn.io/gcs/files/dd971e5613e0cc206c9d24d12db86443.png?auto=format&dpr=1&w=750",
    tokenId: 6,
  }, {
    src: "https://i.seadn.io/gcs/files/dd971e5613e0cc206c9d24d12db86443.png?auto=format&dpr=1&w=750",
    tokenId: 7,
  }]; */

  return (
    <>
      <Container roundedCorners className="m-3 mt-0 inventory">
        <h1>Inventory</h1>
        <div className="boxes9 mb-4">
          {
            (data || []).map((item) => (
              <Link key={item.tokenId} to={`/wear?tokenId=${item.tokenId}`}>
                <div className="box">
                  <img src={item.src} className="img-fluid rounded-start" alt={item.src} />
                </div>
              </Link>
            ))
          }
          {[...Array(data.length < 9 ? 9 - data.length : 3 - (data.length % 3))].map((x, i) =>
            <div className="box" key={i}></div>
          )}
        </div>
        <h1>Items</h1>
        <div className="boxes3">
          <div className="box">
          <Link key={0} to={`/wear?tokenId=0`}>
                <div className="box">
                  <img src="https://i.seadn.io/gcs/files/84cdc84313024124e63e677b017f3a34.png?auto=format&dpr=1&w=750" className="img-fluid rounded-start" alt="test img" />
                </div>
              </Link>
          </div>
          <div className="box"></div>
          <div className="box"></div>
        </div>
      </Container>
    </>
  );
}

export default Bag;
