import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useEth } from "../contexts/EthContext/EthProvider";
import QRCode from "react-qr-code";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const Profile = (props) => {
    const ethService = useEth();

    useEffect(() => {
        props.setIsMenuVisible(1);
    });

    const getAccount = () => {
        if (ethService.state?.accounts) {
            return ethService.state.accounts[0];
        }

        return null;
    }

    return (
        <Container className="p-3">
            <h1 className="mb-3">Profile</h1>

            {getAccount() &&
            <div className="d-flex flex-column align-items-center justify-content-center mb-3">
                <h4>Account Address</h4>
                <div style={{ background: 'white', padding: '16px'}}>
                    <QRCode value={getAccount()} />
                </div>
            </div>
            }
            

            <Link to="/person_info">
                <Button variant="secondary" type="button" className="w-100 mt-3">Edit Personal Info</Button>
            </Link>
        </Container>
    );
}

export default Profile;
