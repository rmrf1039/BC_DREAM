import { useEffect } from 'react';
import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import lineLogoImg from '../assets/img/line_logo.png';

const CouponMarket = (props) => {
    useEffect(() => {
        props.setIsMenuVisible(1);
    });
    
    return (
        <Container className="p-3 vh-100 bg-light text-dark">
            <h1 className="text-center mb-3">My Coupons</h1>

            <div className="d-flex justify-content-end mb-3">
                <Link to="exchange">
                    <Button variant="secondary" className="text-light d-flex align-items-center">
                        <span className="material-symbols-sharp me-2">currency_exchange</span>
                        <span>Exchange</span>
                    </Button>
                </Link>
            </div>

            <Card>
                <Row>
                    <Col xs={4}>
                        <Card.Img variant="top" src={lineLogoImg} />
                    </Col>
                    <Col xs={8}>
                        <Card.Body>
                            <Card.Text>
                                <h1>Line Coupon</h1>
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}

export default CouponMarket;
