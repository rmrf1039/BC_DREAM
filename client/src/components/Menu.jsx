import { NavLink } from "react-router-dom";

export default function Menu() {

  return (
    <div className="container-fluid fixed-bottom p-4">
      <div className="d-flex justify-content-center">
        <div className="d-flex gap-5">
          <NavLink to='/bag' className={({ isActive }) => isActive ? "active" : ""} >
            <span className="material-icons">backpack</span>
          </NavLink>
          <NavLink to='/market' className={({ isActive }) => isActive ? "active" : ""} >
            <span className="material-icons" >storefront</span>
          </NavLink>
          <NavLink to='/exercise' className={({ isActive }) => isActive ? "active" : ""} >
            <span className="material-icons">directions_run</span>
          </NavLink>
          <NavLink to='/coupon' className={({ isActive }) => isActive ? "active" : ""} >
            <span className="material-icons">confirmation_number</span>
          </NavLink>
          <NavLink to='/profile' className={({ isActive }) => isActive ? "active" : ""} >
            <span className="material-icons">account_circle</span>
          </NavLink>
        </div>
      </div>
    </div >
  );
}