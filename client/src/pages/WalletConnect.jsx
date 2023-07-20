import { Web3Modal, Web3Button, useWeb3Modal } from '@web3modal/react'

import { projectId, ethereumClient } from '../providers/WagmiProvider';

import { IconButton, Text, Br } from 'nes-ui-react';

import metamaskLogo from '../assets/img/metamask_logo.png';


export default function MetamaskSetup() {
  const { open } = useWeb3Modal() //later for customize connect waller button

  return (
    <>
      <div className="vh-100 bg-lightGray d-flex align-items-center justify-content-center flex-column">
        <img src={metamaskLogo} width={"300"} alt="metamask logo" />
        <h1 className="mb-5" style={{
          "fontFamily": "'Press Start 2P', cursive"
        }}>Welcome</h1>
        <Br />
        <Br />
        <Br />
      </div>
      <div className="position-fixed bottom-0 start-50 translate-middle-x w-100 p-3 pb-5 row g-0">
        <IconButton className="m-0" color="primary" size="large" onClick={() => open()}>
          <Text size="large" className="text-center w-100">Connect Wallet</Text>
        </IconButton>
      </div>
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeVariables={{
          '--w3m-font-family': '"VT323", monospace',
          '--w3m-background-color': '#496183',
          '--w3m-z-index': 100,
          '--w3m-background-border-radius': 0,
          '--w3m-container-border-radius': 0,
          '--w3m-button-border-radius': 0,
          '--w3m-text-medium-regular-font-family': '"Press Start 2P", cursive',
          '--w3m-text-big-bold-size': '1.4rem',
          '--w3m-text-xsmall-bold-size': '1rem',
          '--w3m-text-xsmall-regular-size': '1.25rem',
        }}
      />
    </>
  );
};
