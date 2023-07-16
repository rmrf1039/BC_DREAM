import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const WearDetail = (props) => {
  const query = useQuery();

  useEffect(() => {
      props.setIsMenuVisible(0);
  });

  const data = {
    tokenId: query.get("tokenId"),
    src: "https://i.seadn.io/gcs/files/e65f60618446f5d9897f2d5a97c30e76.png?auto=format&dpr=1&w=750",
  };

  return (
    <Container className="p-3 pt-0 ">
      <h1 className="h1">LV. 1/20</h1>
      <img src={data.src} alt="nft" className="w-75 d-block m-auto mb-3" />
      
      <Card className="bg-bgBlueLight text-light">
        <Card.Body>
          <Card.Title>
            Sweaty Hat
          </Card.Title>
          <Row>
            <Col>
              Class I
            </Col>
            <Col>
              Type Shoes
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Link to={`/transfer?tokenId=${data.tokenId}`}>
        <Button variant="secondary" type="button" className="w-100 mt-3">Transfer</Button>
      </Link>
    </Container>
  );
}

export default WearDetail;

