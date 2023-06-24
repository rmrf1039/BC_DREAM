import metamaskLogo from '../assets/img/metamask_logo.png';

export default function MetamaskSetup () {
  return (
    <div className="container d-flex align-items-center flex-column p-5">
        <img className='mb-3' src={metamaskLogo} width={"200"} alt="metamask logo"/>
        <h1>請先註冊或登入 Metamask</h1>
        <p>Development 請使用本地網，port 設置為 7545</p>
    </div>
  );
};
