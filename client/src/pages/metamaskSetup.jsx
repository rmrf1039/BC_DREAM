import { Web3Modal, Web3Button, useWeb3Modal } from '@web3modal/react'

import { projectId, ethereumClient } from '../providers/WagmiProvider';

import Container from 'react-bootstrap/Container';

import metamaskLogo from '../assets/img/metamask_logo.png';


export default function MetamaskSetup() {
  const { open, close } = useWeb3Modal() //later for customize connect waller button

  return (
    <>
      <Container className="vh-100 d-flex align-items-center justify-content-center flex-column">
        <img className='mb-3' src={metamaskLogo} width={"200"} alt="metamask logo" />
        <h1 className='mb-3'>Please Connect to Your Wallet</h1>
        <Web3Button />
      </Container>
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
