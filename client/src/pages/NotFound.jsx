import Container from 'react-bootstrap/Container';

import ghostImg from '../assets/img/ghost.png';

const NotFound = () => {
    return (
        <Container className="vh-100 d-flex align-items-center justify-content-center flex-column text-light bg-bgBlue">
            <img className='mb-3' src={ghostImg} width={"200"} alt="ghost logo" />
            <h1 className="text-danger">當前頁面不存在</h1>
        </Container>
    );
}

export default NotFound;
