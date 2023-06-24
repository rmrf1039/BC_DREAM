import { Link } from "react-router-dom";

export default function Menu () {

  return (
    <div className="container-fluid fixed-bottom p-4">
      <div className="d-flex justify-content-center">
        <div className="d-flex gap-5">
            <Link to='/bag'>
              <span className="material-icons">backpack</span>
            </Link>
            <Link to='/market'>
              <span className="material-icons">storefront</span>
            </Link>
            <Link to='/exercise'>
              <span className="material-icons">directions_run</span>
            </Link>
            <Link to='/coupon'>
              <span className="material-icons">confirmation_number</span>
            </Link>
            <Link to='/profile'>
              <span className="material-icons">account_circle</span>
            </Link>
        </div>
      </div>
    </div>
  );
}