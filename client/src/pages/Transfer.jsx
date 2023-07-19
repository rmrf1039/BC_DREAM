import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { QrScanner } from '@yudiel/react-qr-scanner';

import { useAccount } from 'wagmi';
import { isAddress, isAddressEqual } from 'viem';
import { useTransferFrom } from '../contracts/WearContract';

import { setDarkModeActivation, Container, IconButton, PixelIcon, Text, Br } from "nes-ui-react";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Transfer = (props) => {
  const query = useQuery();
  const navigate = useNavigate();

  const { address } = useAccount();
  const [toAddress, setToAddress] = useState("");

  const { isSuccess, write } = useTransferFrom(toAddress, query.get("tokenId"));

  useEffect(() => {
    props.setIsMenuVisible(0);
  });

  useEffect(() => {
    if (isSuccess) navigate("/bag");
  }, [isSuccess, navigate]);

  return (
    <Container className="m-3">
      <QrScanner
        onDecode={(result) => setToAddress(result)}
        onError={(error) => console.log(error?.message)}
      />
      {
        isAddress(toAddress) ?
          !isAddressEqual(toAddress, address) ?
            <>
              <Br />
              <Text size="medium">
                Transfer cannot be undo.
                <br />
                Are you sure to send this Wear to address {toAddress}?
              </Text>
              <IconButton
                disabled={!write}
                color="success"
                className="w-100 mt-3"
                onClick={() => write({
                  args: [address, toAddress, query.get("tokenId"), 1, []],
                })}
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