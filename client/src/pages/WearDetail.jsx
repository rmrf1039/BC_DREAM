import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { setDarkModeActivation, Container, Button, Text, Br, Badge, BadgeSplitted, Progress, IconButton } from "nes-ui-react";

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
    <>
      <Container title="LV. 1/20" alignTitle="right" className="m-3">
        <img src={data.src} alt="nft" className="w-100 mb-3" />
        <div className="mb-2">
          <Badge backgroundColor="warning" text="Epic" color='#000' />
          <BadgeSplitted textLeft='20%' backgroundColor="error" text="Exp Bonus" />
        </div>
        <div>
          <Text size="large" className="m-0">Lucky</Text>
          <Progress value="30" max="100" color="warning" />
        </div>
        <div>
          <Text size="large" className="m-0">Work Max</Text>
          <Progress value="60" max="100" color="success" />
        </div>

      </Container>
      <Container title="Control" alignTitle="right" className="m-3 mt-4">
        <div className="mb-3">
          <Link to={`/transfer?tokenId=${data.tokenId}`}>
            <IconButton color="error" size="medium" className="w-100">
              <span className="material-symbols-sharp">currency_exchange</span>
              <Text size='small' className="ms-2">Transfer</Text>
            </IconButton>
          </Link>
        </div>
        <Link to={`/transfer?tokenId=${data.tokenId}`}>
          <IconButton color="primary" size="medium" className="w-100">
            <span className="material-symbols-sharp">confirmation_number</span>
            <Text size='small' className="ms-2">Exchange</Text>
          </IconButton>
        </Link>
      </Container>
    </>
  );
}

export default WearDetail;

