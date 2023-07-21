import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { QrScanner } from '@yudiel/react-qr-scanner';

import { useAccount } from 'wagmi';
import { isAddress, isAddressEqual } from 'viem';
import { useTransferFrom } from '../contracts/WearContract';

import { Container, IconButton, PixelIcon, Text, Br } from "nes-ui-react";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Transfer = () => {
  const query = useQuery();
  const navigate = useNavigate();

  const { address } = useAccount();
  const [toAddress, setToAddress] = useState("");

  const { isSuccess, write } = useTransferFrom(toAddress, query.get("tokenId"));

  useEffect(() => {
    if (isSuccess) navigate("/bag");
  }, [isSuccess, navigate]);

  return (
    <Container className="m-3 mt-0">
      <QrScanner
        onDecode={(result) => setToAddress(result)}
        onError={(error) => console.log(error?.message)}
      />
      {
        isAddress(toAddress) ?
          !isAddressEqual(toAddress, address) ?
            <>
              <Br />
              <Text size="medium" className="text-break text-center">
                <p className="text-danger text-center">Transfer cannot be undo.</p>
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
                <PixelIcon inverted={false} name="pixelicon-checkmark" size="medium" className="me-2" />
                <Text color="black" size="large">Confirm</Text>
              </IconButton>
            </>
            :
            <Text className="text-center text-danger mt-3">Self transfer is prohibited</Text>
          :
          <Text className="text-center mt-3">Please scan the receiver's account address.</Text>
      }
    </Container>
  );
};

export default Transfer;