import { useEffect } from 'react';
import { useLocation } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

const Market = (props) => {
    useEffect(() => {
        props.setIsMenuVisible(1);
    });

    console.log(useLocation())
    return (
        <Container className="p-3 vh-100 bg-light text-dark">
            <h1 className="text-center mb-3">Buy New Wear</h1>
            <Form>
                <Carousel indicators={false} interval={null} variant="dark">
                    <Carousel.Item>
                        <img
                        className="d-block w-50 m-auto"
                        src="https://i.seadn.io/gcs/files/e65f60618446f5d9897f2d5a97c30e76.png?auto=format&dpr=1&w=750"
                        alt="First slide"
                        />
                        <Carousel.Caption className="position-static text-dark">
                            <h3>Hat</h3>
                            <p>Design for regular sport</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-50 m-auto"
                        src="https://i.seadn.io/gcs/files/1986a8a71a31ce0221a96c2b9aef87bb.png?auto=format&dpr=1&w=750"
                        alt="Second slide"
                        />

                        <Carousel.Caption className="position-static text-dark">
                            <h3>Sweaty Shirt</h3>
                            <p>Bonus for fitness</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-50 m-auto"
                        src="https://i.seadn.io/gcs/files/5de47d7599197e428d9425087a2027f0.png?auto=format&dpr=1&w=750"
                        alt="Third slide"
                        />

                        <Carousel.Caption className="position-static text-dark">
                            <h3>Sweaty Shirt</h3>
                            <p>Bonus for fitness</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

                <Button variant="dark" type="submit" className="w-100 mt-3">Purchase</Button>
            </Form>
        </Container>
    );
}

export default Market;
