import { useEffect } from "react";

import { Link } from "react-router-dom";
import { useAccount } from 'wagmi';
import { useAxios } from '../providers/AxiosProvider';
import QRCode from "react-qr-code";

import { Container, Button } from "nes-ui-react";

const Profile = ({ layout = null }) => {
  useEffect(() => {
    layout?.({
      type: 'init',
      data: {
        isShowMenu: true,
        title: '帳戶',
        backgroundColor: '#E0DCDB',
        backgroundImage: 'url("https://lh3.google.com/u/0/d/12OYkAJ18918N0qwFflRzEUlYSeovwROl=w3360-h1686-iv1")',
      }
    });
  }, [layout]);

  const { address } = useAccount()
  const { logout } = useAxios()

  return (
    <>
      <Container roundedCorners title="錢包地址" alignTitle="center" className="m-3 mt-0 gameboy-layout">
        {address ?
          <div className="d-flex flex-column align-items-center justify-content-center">
            <QRCode
              value={address}
              bgColor="transparent"
              fgColor="#1D3214"
              className="w-100 h-100"
            />
          </div>
          :
          <h1 className="text-center">加載中...</h1>
        }
      </Container>

      <div className="ps-3 pe-3 d-flex flex-column align-items-end">
        <Link to="/person_info">
          <Button color="pink" size="medium" className="mb-3 pink-button">編輯個資</Button>
        </Link>
        <Button color="pink" size="medium" className="pink-button" onClick={() => logout()}>登出</Button>
      </div>
    </>
  );
}

export default Profile;
