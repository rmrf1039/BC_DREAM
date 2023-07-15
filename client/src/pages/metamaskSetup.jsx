import Container from 'react-bootstrap/Container';

import metamaskLogo from '../assets/img/metamask_logo.png';

export default function MetamaskSetup() {
  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center flex-column text-light bg-primary">
      <img className='mb-3' src={metamaskLogo} width={"200"} alt="metamask logo" />
      <h1>Please Log in Metamask</h1>
      <p>Use local net for devlopment, set the port to 7545.</p>
    </Container>
  );
};
