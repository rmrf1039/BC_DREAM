import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useEth } from "../providers/WagmiProvider";
import { QrScanner } from '@yudiel/react-qr-scanner';

import Card from 'react-bootstrap/Card';

import { setDarkModeActivation, Container, IconButton, PixelIcon, Text, Table, Br } from "nes-ui-react";

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

  const safeTransferFrom = async (to, tokenId) => {
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
    <Container className="m-3">
      <QrScanner
        onDecode={(result) => setData(result)}
        onError={(error) => console.log(error?.message)}
      />
      {
        ethService.state?.web3?.utils?.isAddress(data) ?
          data !== ethService.state.web3.utils.toChecksumAddress(ethService.state.accounts[0]) ?
            <>
              <Br />
              <Text size="medium">
                Transfer cannot be undo.
                <br />
                Are you sure to send this Wear to address {data}?
              </Text>
              <IconButton
                color="success"
                className="w-100 mt-3"
                onClick={() => safeTransferFrom(data, query.get("tokenId")).then(() => navigate("/bag"))}
              >
                <PixelIcon inverted={false} name="pixelicon-checkmark" size="small" className="me-2" />
                <Text color="black" size="small">Confirm</Text>
              </IconButton>
            </>
            :
            <h2 className="text-center text-danger">Self transfer is prohibited</h2>
          :
          <h2 className="text-center">Please scan the receiver's account address.</h2>
      }
    </Container>
  );
};

export default Transfer;