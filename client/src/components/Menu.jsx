import { NavLink } from "react-router-dom";

export default function Menu(props) {
  
  return (
    <nav id="nav" className={`${ !props.isMenuVisible && 'd-none' } container-fluid fixed-bottom pt-2 pb-2 frosted-background`}>
      <div className="d-flex justify-content-around">
        <NavLink to='/bag' className={`d-flex flex-column align-items-center justify-content-center`}>
          <span className="material-symbols-sharp">backpack</span>
          Backpack
        </NavLink>
        <NavLink to='/market' className={`d-flex flex-column align-items-center justify-content-center`} >
          <span className="material-symbols-sharp" >storefront</span>
          Market
        </NavLink>
        <NavLink to='/exercise' className={`d-flex flex-column align-items-center justify-content-center`} >
          <span className="material-symbols-sharp">directions_run</span>
          Start
        </NavLink>
        <NavLink to='/coupon' className={`d-flex flex-column align-items-center justify-content-center`} >
          <span className="material-symbols-sharp">confirmation_number</span>
          Coupon
        </NavLink>
        <NavLink to='/profile' className={`d-flex flex-column align-items-center justify-content-center`} >
          <span className="material-symbols-sharp">account_circle</span>
          Profile
        </NavLink>
      </div>
    </nav >
  );
}