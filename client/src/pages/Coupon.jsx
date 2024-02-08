import { useState, useEffect } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Text } from 'nes-ui-react';

import lineLogoImg from '../assets/img/line_logo.png';
import mcLogoImg from '../assets/img/mcdonalds_logo.png';
import nikeLogoImg from '../assets/img/nike_logo.png';
import adidasLogoImg from '../assets/img/adidas_logo.png';
import worldgymLogoImg from '../assets/img/worldgym_logo.png';
import gymboyLogoImg from '../assets/img/gymboy_logo.png';

const logoImgs = {
  line: lineLogoImg,
  mc: mcLogoImg,
  nike: nikeLogoImg,
  adidas: adidasLogoImg,
  worldgym: worldgymLogoImg,
  gymboy: gymboyLogoImg,
};

const CouponMarket = ({ layout = null }) => {
  useEffect(() => {
    layout?.({
      type: 'init',
      data: {
        isShowMenu: true,
        title: '優惠券',
        backgroundColor: '#DADADA',
      }
    });
  }, [layout]);

  const [coupons, setCoupons] = useState([]);

  const updateCoupons = () => {
    axios.get('/api/coupon/')
    .then((res) => {
      setCoupons(res.data);
    });
  }

  useEffect(() => {
    updateCoupons();
  }, []);

  const Coupon = ({ tokenId, source, imgSrc, expired }) => {
    const removeCoupon = () => {
      let confirmation = window.confirm('確定要使用這張優惠券嗎？');
  
      if (confirmation) {
        axios.delete(`/api/coupon/${tokenId}`)
        .then(() => updateCoupons());
      }
    };
  
    return (
      <Row
        className="m-0 mb-3 w-100 g-0 bg-lightGray"
        style={{
          "boxShadow": "5px 5px 0 0 #B0B1B4",
        }}
        onClick={removeCoupon}
      >
        <Col xs={3} className={`${source} coupon-img bg-dark d-flex justify-content-center`}>
          <img className={`w-100`} src={imgSrc} alt={source + '_logo_img'}></img>
        </Col>
        <Col xs={9} className="d-flex flex-column justify-content-between p-3">
          <Text size="large" className="">{tokenId}:{source.charAt(0).toUpperCase() + source.slice(1)}</Text>
          <Text size="small" className="text-gray m-0">{expired}</Text>
        </Col>
      </Row>
    );
  }

  return (
    <>
      {
        coupons.length > 0
        ?
        <Container className="p-3 pt-0 h-100 overflow-scroll">
          {
            coupons.map((item, idx) => (
              <Coupon key={idx} tokenId={item.token_id} source={item.type} imgSrc={logoImgs[item.type]} expired={item.date}/>
            ))
          }
        </Container>
        :
        <div className='container h-100 d-flex align-items-center justify-content-center'>
          <Text>無可用優惠券</Text>
        </div>
      }
    </>
  );
}

export default CouponMarket;
