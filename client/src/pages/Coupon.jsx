import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Text } from 'nes-ui-react';

import lineLogoImg from '../assets/img/line_logo.png';
import mcLogoImg from '../assets/img/mcdonalds_logo.png';
import nikeLogoImg from '../assets/img/nike_logo.png';
import adidasLogoImg from '../assets/img/adidas_logo.png';
import worldgymLogoImg from '../assets/img/worldgym_logo.png';

const Coupon = ({ source, imgSrc, expired }) => {
  return (
    <Row className="m-0 mb-3 w-100 g-0 bg-lightGray" style={{
      "boxShadow": "5px 5px 0 0 #B0B1B4",
    }}>
      <Col xs={3} className={`${source} coupon-img bg-dark d-flex justify-content-center`}>
        <img className={`w-100`} src={imgSrc} alt="line logo"></img>
      </Col>
      <Col xs={9} className="d-flex flex-column justify-content-between p-3">
        <Text size="large" className="">{source.charAt(0).toUpperCase() + source.slice(1)}</Text>
        <Text size="small" className="text-gray m-0">{expired}</Text>
      </Col>
    </Row>
  );
}

const CouponMarket = () => {
  return (
    <Container className="p-3 pt-0 h-100 overflow-scroll">
      <Coupon source="line" imgSrc={lineLogoImg} expired="2023/8/8" />
      <Coupon source="mcdonalds" imgSrc={mcLogoImg} expired="2023/8/9" />
      <Coupon source="nike" imgSrc={nikeLogoImg} expired="2023/8/10" />
      <Coupon source="adidas" imgSrc={adidasLogoImg} expired="2023/8/11" />
      <Coupon source="worldgym" imgSrc={worldgymLogoImg} expired="2023/8/12" />
      <Coupon source="line" imgSrc={lineLogoImg} expired="2023/8/8" />
      <Coupon source="mcdonalds" imgSrc={mcLogoImg} expired="2023/8/9" />
      <Coupon source="nike" imgSrc={nikeLogoImg} expired="2023/8/10" />
      <Coupon source="adidas" imgSrc={adidasLogoImg} expired="2023/8/11" />
      <Coupon source="worldgym" imgSrc={worldgymLogoImg} expired="2023/8/12" />
    </Container>
  );
}

export default CouponMarket;
