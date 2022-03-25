import React from "react";
import "./Navbar.css";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import logo from "../assets/logo.png";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { Auth } from "../firebase";
import { signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { Badge, Button, IconButton, Stack } from "@mui/material";
import { deleteUser } from "../action/Actions";
import {
  Home,
  Logout,
  MenuOpen,
  MenuRounded,
  ShoppingCart,
} from "@mui/icons-material";
function Menu() {
  const user = useSelector((state) => state.ChangeTheUser.user);
  const wishlist = useSelector((state) => state.OrderChanger.wishlist);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOut = () => {
    signOut(Auth);
    dispatch(deleteUser());
    navigate("/login");
  };
  return (
    <div className="menu">
      <nav className="navbar navbar-expand-lg text-uppercase navbar-light bg-warning">
        <NavLink className="navbar-brand menu__logo" to="/">
          <img src={logo} alt="Logo" className="logo" />
        </NavLink>
        <IconButton
          className="menu_sm_colse mx-4"
          onClick={() => {
            if (
              document.querySelector(".collapse").classList ==
              "collapse navbar-collapse show"
            )
              document.querySelector(".collapse").classList =
                "collapse navbar-collapse";
            else
              document.querySelector(".collapse").classList =
                "collapse navbar-collapse show";
          }}
        >
          <MenuRounded color="secondary" fontSize="2rem" />
        </IconButton>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav ">
            <li
              onClick={() => {
                if (
                  document.querySelector(".collapse").classList ==
                  "collapse navbar-collapse show"
                )
                  document.querySelector(".collapse").classList =
                    "collapse navbar-collapse";
                else
                  document.querySelector(".collapse").classList =
                    "collapse navbar-collapse show";
              }}
              className="nav-item"
            >
              <NavLink className="nav-link" to="/search">
                <SearchIcon />
                <span>search</span>
              </NavLink>
            </li>
            <li
              onClick={() => {
                if (
                  document.querySelector(".collapse").classList ==
                  "collapse navbar-collapse show"
                )
                  document.querySelector(".collapse").classList =
                    "collapse navbar-collapse";
                else
                  document.querySelector(".collapse").classList =
                    "collapse navbar-collapse show";
              }}
              className="nav-item"
            >
              <NavLink className="nav-link" to="/">
                <Home /> <span>Home</span>
              </NavLink>
            </li>
            <li
              onClick={() => {
                if (
                  document.querySelector(".collapse").classList ==
                  "collapse navbar-collapse show"
                )
                  document.querySelector(".collapse").classList =
                    "collapse navbar-collapse";
                else
                  document.querySelector(".collapse").classList =
                    "collapse navbar-collapse show";
              }}
              className="nav-item"
            >
              <NavLink className="nav-link" to="/cart">
                <Badge badgeContent={wishlist.length} color="secondary">
                  <ShoppingCart />
                </Badge>
                <span>Cart</span>
              </NavLink>
            </li>
            <li
              onClick={() => {
                if (
                  document.querySelector(".collapse").classList ==
                  "collapse navbar-collapse show"
                )
                  document.querySelector(".collapse").classList =
                    "collapse navbar-collapse";
                else
                  document.querySelector(".collapse").classList =
                    "collapse navbar-collapse show";
              }}
              className="nav-item"
            >
              <NavLink className="nav-link" to="/cart">
                <LocalMallIcon /> <span>Orders</span>
              </NavLink>
            </li>
            <li className="nav-item center">
              <Button
                onClick={logOut}
                sx={{ color: "#111" }}
                startIcon={<Logout />}
              >
                Logout
              </Button>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                <PersonIcon /> <span>profile</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      {/* <Navbar className="menu__container">
        <Navbar.Brand className="menu__logo" href="/">
          <img src={logo} alt="Logo" className="logo" />
        </Navbar.Brand>
        <Nav className="ms-auto menu__items float-end">
          <Nav.Link href="/search">
            <SearchIcon />
          </Nav.Link>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="contact">Contact</Nav.Link>
          <Nav.Link href="register"></Nav.Link>
          <Nav.Link href="cart"></Nav.Link>
          <Nav.Link href="#" className="d-flex flex-cloumn"></Nav.Link>
          <Nav.Link href="profile"></Nav.Link>
        </Nav>
      </Navbar> */}
    </div>
  );
}

export default Menu;
