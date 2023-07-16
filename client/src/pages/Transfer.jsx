import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useEth } from "../contexts/EthContext/EthProvider";
import { QrReader } from 'react-qr-reader';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Transfer = (props) => {
  const query = useQuery();
  const navigate = useNavigate();
  const ethService = useEth();
  const [data, setData] = useState("");

  useEffect(() => {
    props.setIsMenuVisible(0);
  });

  const safeTransferFrom  = async (to, tokenId) => {
    const account = ethService.state.accounts[0];

    return new Promise((resolve) => {
      ethService.state.contract.methods.safeTransferFrom(account, to, tokenId, 1, [])
      .send({ from: account })
      .then((receipt) => {
        resolve(true);
      });
    });
  }

  return (
    <Container className="p-3">
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }
        }}
        style={{ width: '100%' }}
      />
      {
        ethService.state?.web3?.utils?.isAddress(data) ?
          data !== ethService.state.web3.utils.toChecksumAddress(ethService.state.accounts[0]) ?
          <>
            <Card className="bg-bgBlueLight text-light">
              <Card.Body>
                <Card.Title>Transfer Detail</Card.Title>
                <Card.Text>
                  Transfer the NFT #{query.get("tokenId")}
                  <br />
                  from {ethService.state.web3.utils.toChecksumAddress(ethService.state.accounts[0])}
                  <br />
                  to {data}
                </Card.Text>
              </Card.Body>
            </Card>
            <Button
              variant="primary"
              type="button"
              className="w-100 mt-3"
              onClick={() => safeTransferFrom(data, query.get("tokenId")).then(() => navigate("/bag"))}
            >Confirm to transfer</Button>
          </>
          :
          <h2 className="text-center text-danger">You cannot transfer to yourself</h2>
        :
        <h2 className="text-center">Please scan the receiver's account address.</h2>
      }
    </Container>
  );
};

export default Transfer;