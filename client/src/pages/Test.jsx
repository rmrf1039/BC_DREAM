import { useState } from "react";
import { useEth } from "../providers/WagmiProvider";

import Input from "../components/forms/Input"

const Test = () => {
  const ethService = useEth();
  const [ethReturnMsg, setEthReturnMsg] = useState("");

  const [toAddress, setToAddress] = useState("0x78a1cFC25c5ce73B9e8fa0a165cF9242E6A1c0AB");
  const [tokenId, setTokenId] = useState("1");

  const getURI = async (tokenId) => {
    const account = ethService.state.accounts[0];

    return new Promise((resolve) => {
      ethService.state.contract.methods.uri(tokenId)
      .call({ from: account })
      .then((result) => {
        resolve(result);
      });
    });
  }

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

  const getLastTokenId = async () => {
    const account = ethService.state.accounts[0];

    return new Promise((resolve) => {
      ethService.state.contract.methods.lastTokenId()
      .call({ from: account })
      .then((result) => {
        resolve(result);
      });
    });
  }

  const mintNft = async (toAddr) => {
    const account = ethService.state.accounts[0];

    return new Promise((resolve) => {
      getLastTokenId()
      .then(lastTokenId => {
        ethService.state.contract.methods.mintWear(toAddr)
        .send({ from: account })
        .then((receipt) => {
          resolve(lastTokenId);
        });
      })
    });
  }

  const listingOwnedNft = async () => {
    const account = ethService.state.accounts[0];

    return new Promise((resolve, reject) => {
      getLastTokenId()
      .then((lastTokenId) => {
        const addresses = [];
        const tokens = [];

        for (let i = 0; i <= lastTokenId - 1; i++) {
          addresses.push(account);
          tokens.push(i);
        }

        ethService.state.contract.methods.balanceOfBatch(addresses, tokens)
        .call({ from: account })
        .then((result) => {
          const heldNftUri = [];

          Promise.all(result.map((bool, idx) => {
            if (parseInt(bool)) return getURI(idx).then((r) => heldNftUri.push(r));

            return null;
          }))
          .then(() => {
            resolve(heldNftUri);
          })
          .catch(() => {
            reject();
          });
        });
      });
    });
  }

  return (
      <div className="text-light p-3">
          <h1>Test</h1>
          <div className="row">
            <div className="col-12 mb-3">
              Current address: {ethService.state.accounts}
              <br />
              <Input title="To address" value={toAddress} setValue={setToAddress}></Input>
              <br />
              <Input title="Token Id" value={tokenId} setValue={setTokenId}></Input>
            </div>
            <div className="col-12 mb-3">
              Return Msg: {ethReturnMsg}
              <br />
              Error Msg: 
            </div>
            <div className="col-12 gap-3 d-flex flex-wrap">
              <button onClick={() => getURI(tokenId).then(r => setEthReturnMsg(r))} className="btn btn-light mb-3">getURL({tokenId})</button>
              <button onClick={() => safeTransferFrom(toAddress, tokenId)} className="btn btn-light mb-3">safeTransferFrom({toAddress}, {tokenId})</button>
              <button onClick={() => getLastTokenId().then(r => setEthReturnMsg(r))} className="btn btn-light mb-3">getLastTokenId()</button>
              <button onClick={() => mintNft(toAddress)} className="btn btn-light mb-3">mintNft({toAddress})</button>
              <button onClick={() => listingOwnedNft().then(r => setEthReturnMsg(r.toString()))} className="btn btn-light mb-3">listingOwnedNft()</button>
            </div>
          </div>
      </div>
  );
}

export default Test;
