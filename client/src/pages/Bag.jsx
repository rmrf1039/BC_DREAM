import { useState, useEffect, useCallback, useMemo } from 'react'
import { Link } from "react-router-dom";

import { useEth } from "../contexts/EthContext/EthProvider";

import Container from 'react-bootstrap/Container';

const Bag = (props) => {
  const ethService = useEth();
  const account = useMemo(() => (ethService.state?.accounts ? ethService.state.accounts[0] : null), [ethService.state.accounts]);
  const [isCardOpen, setIsCardOpen] = useState(false);

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
  /*const data = [{
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
  }];*/

  return (
    <>
      <Container className="p-3">
        <h1 className="text-light text-center">Current Wears</h1>
      </Container>
      <main>
        <section>
        </section>
        <Container className="card p-3 fixed-bottom skip-menu-padding-bottom">

          <div className="d-flex align-items-center justify-content-center mb-2" onClick={() => setIsCardOpen(!isCardOpen)}>
            <span className="material-symbols-sharp text-gray me-2">
              {isCardOpen ? 'expand_more' : 'expand_less'}
            </span>
            <h4 className="text-gray mb-0 text-center">
              {isCardOpen ? 'Close' : 'Click to see more'}
            </h4>
          </div>

          <div className={`row nft-items-grid card-window-scroller ${!isCardOpen && 'hide'}`}>
            <h4 className="text-gray mb-3">Supplies</h4>

            <h4 className="text-gray mb-3">Other Wears</h4>
            {(data || []).map((item) => (
              <div className="col-4" key={item.tokenId}>
                <Link to={`/wear?tokenId=${item.tokenId}`}>
                  <img src={item.src} className="img-fluid rounded-start" alt={item.src} />
                </Link>
              </div>
            ))}

          </div>
        </Container>
      </main>
    </>
  );
}

export default Bag;
