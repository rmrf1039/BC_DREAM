import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { QrScanner } from '@yudiel/react-qr-scanner';

import { useAccount } from 'wagmi';
import { isAddress, isAddressEqual } from 'viem';
import { useTransferFrom } from '../contracts/WearContract';

import { Container, IconButton, PixelIcon, Text, Br } from "nes-ui-react";

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const Transfer = ({ layout = null }) => {
  useEffect(() => {
    layout?.({
      type: 'init',
      data: {
        isShowBack: true,
        isShowMenu: false,
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout]);

  const query = useQuery();
  const navigate = useNavigate();

  const { address } = useAccount();
  const [toAddress, setToAddress] = useState("");

  const { isSuccess, write } = useTransferFrom(toAddress, Number(query.get("tokenId")));

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
                <p className="text-danger text-center">該操作不可逆</p>
                您確定要將該裝備轉移至地址 ({toAddress}) 嗎?
              </Text>
              <IconButton
                disabled={!write}
                color="success"
                className="w-100 mt-3"
                onClick={() => {
                  console.log([address, toAddress, Number(query.get("tokenId")), 1, []]);
                  write({
                    args: [address, toAddress, query.get("tokenId"), '1', ''],
                  })
                }
              }
              >
                <PixelIcon inverted={false} name="pixelicon-checkmark" size="medium" className="me-2" />
                <Text color="black" size="large">確認</Text>
              </IconButton>
            </>
            :
            <Text className="text-center text-danger mt-3">禁止自我轉移</Text>
          :
          <Text className="text-center mt-3">請掃描接收者的錢包地址二維碼</Text>
      }
    </Container>
  );
};

export default Transfer;