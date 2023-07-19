import { useState, useEffect, useCallback, useMemo } from 'react'
import { Link } from "react-router-dom";

import { useEth } from "../providers/WagmiProvider";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { setDarkModeActivation, Container, Toolbar, IconButton, Separator, Spacer, Heading, Button, Text } from "nes-ui-react";

const Bag = (props) => {
  const ethService = useEth();
  const account = useMemo(() => (ethService.state?.accounts ? ethService.state.accounts[0] : null), [ethService.state.accounts]);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    props.setIsMenuVisible(1);
  });

  const getLastTokenId = useCallback(async () => {
    return new Promise((resolve, reject) => {
      if (!account) reject();

      ethService.state.contract.methods.lastTokenId()
        .call({ from: account })
        .then((result) => {
          resolve(result);
        });
    })
      .catch((e) => { });
  }, [account, ethService.state?.contract?.methods]);

  const getURI = useCallback(async (tokenId) => {
    return new Promise((resolve, reject) => {
      if (!account) reject();

      ethService.state.contract.methods.uri(tokenId)
        .call({ from: account })
        .then((result) => {
          resolve(result);
        });
    })
      .catch((e) => { });;
  }, [account, ethService.state?.contract?.methods]);

  const listingOwnedNft = useCallback(async () => {
    return new Promise((resolve, reject) => {
      if (!account) reject();

      getLastTokenId()
        .then((lastTokenId) => {
          const addresses = [];
          const tokens = [];

          for (let i = 0; i <= lastTokenId - 1; i++) {
            addresses.push(account);
            tokens.push(i);
          }

          try {
            ethService.state.contract.methods.balanceOfBatch(addresses, tokens)
              .call({ from: account })
              .then((result) => {
                const heldNftUri = [];

                Promise.all(result.map((bool, idx) => {
                  if (parseInt(bool)) return getURI(idx).then((r) => heldNftUri.push({
                    tokenId: idx,
                    meta: r,
                  }));

                  return null;
                }))
                  .then(() => {
                    resolve(heldNftUri);
                  })
                  .catch(() => {
                    reject();
                  });
              });
          } catch {
            reject();
          }
        });
    })
      .catch((e) => { });;
  }, [getLastTokenId, getURI, account, ethService]);

  const data = useMemo(() => {
    const data = [];

    listingOwnedNft()
      .then((list) => {
        if (list) {
          list.forEach((r) => {
            data.push({
              ...r,
              src: "https://i.seadn.io/gcs/files/e65f60618446f5d9897f2d5a97c30e76.png?auto=format&dpr=1&w=750",
            });
          });
        }
      });

    return data;
  }, [listingOwnedNft]);

  // 之後替換成 fetch 後的 dataset
  /* const data = [{
    src: "https://i.seadn.io/gcs/files/e65f60618446f5d9897f2d5a97c30e76.png?auto=format&dpr=1&w=750",
    tokenId: 1,
  }, {
    src: "https://i.seadn.io/gcs/files/1986a8a71a31ce0221a96c2b9aef87bb.png?auto=format&dpr=1&w=750",
    tokenId: 2,
  }, {
    src: "https://i.seadn.io/gcs/files/84cdc84313024124e63e677b017f3a34.png?auto=format&dpr=1&w=750",
    tokenId: 3,
  }, {
    src: "https://i.seadn.io/gcs/files/5de47d7599197e428d9425087a2027f0.png?auto=format&dpr=1&w=750",
    tokenId: 4,
  }, {
    src: "https://i.seadn.io/gae/eDlHWnyukmwhxHwtsTS2LYQhW1acN6Y_d4rGWiG6_TIYaPGnWroRJrZ3eH60gvu8ai_djia5dx03Ea9wWOJOZgV-mOS_ffv7PVSwtw?auto=format&dpr=1&w=750",
    tokenId: 5,
  }, {
    src: "https://i.seadn.io/gcs/files/dd971e5613e0cc206c9d24d12db86443.png?auto=format&dpr=1&w=750",
    tokenId: 6,
  }, {
    src: "https://i.seadn.io/gcs/files/dd971e5613e0cc206c9d24d12db86443.png?auto=format&dpr=1&w=750",
    tokenId: 7,
  }]; */

  return (
    <>
      <div className="ps-3 pe-3">
        <Toolbar borderless roundedCorners={false}>
          <IconButton color="primary" size="small" onClick={() => setTab(!tab ? 1 : tab - 1)}>
            <span className="material-symbols-sharp text-light">chevron_left</span>
          </IconButton>
          <Separator />
          <Spacer />
          <Text size="large">
            {
              tab === 0 && "Current Loaded Wears"
            }
            {
              tab === 1 && "Others Wears"
            }
          </Text>
          <Spacer />
          <Separator />
          <IconButton color="primary" size="small" onClick={() => setTab(tab === 1 ? 0 : tab + 1)}>
            <span className="material-symbols-sharp text-light">chevron_right</span>
          </IconButton>
        </Toolbar>
      </div>

      <div className="p-3 pt-4">
        {
          tab === 0 &&
          <>
            Current Wears
          </>
        }
        {
          tab === 1 &&
          <>
            <Container title="Supplies" className="m-0"></Container>
            <br />
            <Container title="Other Wears" className="m-0 pb-2">
              <Row>
                {(data || []).map((item) => (
                  <Col xs={4} key={item.tokenId} className="mb-4">
                    <Link to={`/wear?tokenId=${item.tokenId}`}>
                      <img src={item.src} className="img-fluid rounded-start" alt={item.src} />
                    </Link>
                  </Col>
                ))}
              </Row>
            </Container>
          </>
        }
      </div>
    </>
  );
}

export default Bag;
