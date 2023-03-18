import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCartState } from "./ContextReducer";


const Navbar = () => {
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false)
  let data = useCartState();
  const handlelogout = () => {
    localStorage.removeItem("authToken");
    navigate('/login');
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            DreamsKitchen
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>

              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/myOrder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>

                <Link
                  className="btn bg-white text-success mx-1"
                  to="/createuser"
                >
                  SignUp
                </Link>
                
              </div>
            ) : (
              <div className="d-flex">
                <div className="mt-1 text-white border-bottom  border-white "><p>{localStorage.getItem("userEmail")}</p></div>
                <div className="btn bg-white text-success mx-4" onClick={()=>setCartView(true)}>
                  My Cart {" "}
                  <Badge pill bg='danger'>
                 
                    {data.length?data.length:""}
                 
                    </Badge>
                  </div>
                  {cartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal> : null}
                <div
                  className="btn bg-white text-danger"
                  onClick={handlelogout}
                >
                  LogOut
                </div>
                
                
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
