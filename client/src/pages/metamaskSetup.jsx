import metamaskLogo from '../assets/img/metamask_logo.png';

export default function MetamaskSetup () {
  return (
    <div className="container h-full d-flex align-items-center justify-content-center flex-column text-light">
        <img className='mb-3' src={metamaskLogo} width={"200"} alt="metamask logo"/>
        <h1>請先註冊或登入 Metamask</h1>
        <p>Development 請使用本地網，port 設置為 7545</p>
    </div>
  );
};
