import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import search from "../../assets/search-solid.svg";
import Avatar from "../../components/Avatar/Avatar";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../actions/currentUser";
import decode from "jwt-decode";

const Navbar = () => {
  const dispatch = useDispatch();
  var User = useSelector((state) => state.currentUserReducer);

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = decode(token);
      // logging out after 1hr
      if(decodedToken.exp*1000<new Date().getTime()){
        handleLogout()
      }
    }
    // On refreshing the profile is disappearing
    // so dispatch here on each refersh
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  };

  return (
    <nav className="main-nav">
      <div className="navbar">
        <div className="navbar-1">
          <Link to="/" className="nav-item nav-logo">
            <img src={logo} alt="logo" />
          </Link>
          <Link
            to="/"
            style={{ width: "100px", padding: "10px 20px" }}
            className="nav-item nav-btn res-nav"
          >
            About
          </Link>
          <Link
            to="/"
            style={{ width: "100px", padding: "10px 20px" }}
            className="nav-item nav-btn res-nav"
          >
            Products
          </Link>
          <Link
            to="/"
            style={{ width: "100px", padding: "10px 20px" }}
            className="nav-item nav-btn res-nav"
          >
            For Teams
          </Link>
          <form>
            <input type="text" placeholder="Search..." />
            <img src={search} alt="search" width="18" className="search-icon" />
          </form>
        </div>
        <div className="navbar-2">
          {User === null ? (
            <Link to="/Auth" className="nav-item nav-links">
              Log in
            </Link>
          ) : (
            <>
              <Avatar
                backgroundColor="#009dff"
                px="10px"
                py="7px"
                borderRadius="50%"
                color="white"
              >
                <Link
                  to={`/Users/${User?.result?._id}`}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {User?.result?.name.charAt(0).toUpperCase()}
                </Link>
              </Avatar>
              <button className="nav-item nav-links" onClick={handleLogout}>
                Log out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
