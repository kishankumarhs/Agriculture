import React from "react";
import "./Fotter.css";
import logo from "../assets/logo-white.png";
import { KeyboardArrowUp, FavoriteTwoTone } from "@mui/icons-material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function Fotter() {
  function backToTop(e) {
    e.preventDefault();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <div className="fotter bg-dark container-fluid">
      <div
        className="footer__back_to_top container-fluid justify-content-center align-items-center  d-flex flex-column"
        onClick={backToTop}
      >
        <KeyboardArrowUp />
        <p className="backtotop text-capitalize text-white">Back to top</p>
      </div>
      <div className="footer_links row px-5 py-5 bg-dark text-white">
        <div className="col-md-12 d-flex flex-column col-lg-4 col-12 fotter__brand">
          <img src={logo} className="fotter__logo" alt="" srcset="" />
          <p className="h4 lead">Royal Agriculture</p>
          <p className="text-white fotter__brand_desc text-start ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            voluptate aliquid, officia, voluptatibus aperiam dolores blanditiis
            tempora ab voluptates accusamus quam fugit ipsum facere esse itaque!
            Deserunt nulla expedita ipsam?
          </p>
        </div>
        <div className="col-12  d-flex flex-column py-3 col-lg-4 col-md-12 fotter__contact">
          <p className="h5 text-uppercase">Contact</p>
          <div className="d-flex mt-3 py-1 justify-content-strat algin-items-center contacts">
            <LocationOnIcon sx={{ margin: "0 5px" }} />
            <p>Hasan ,karnataka</p>
          </div>
          <div className="d-flex py-1 justify-content-strat algin-items-center contacts">
            <LocalPhoneIcon sx={{ margin: "0 5px" }} />
            <p>+91 6360158793</p>
          </div>
          <div className="d-flex py-1 justify-content-strat algin-items-center contacts">
            <MailIcon sx={{ margin: "0 5px" }} />
            <p>info@royalagrihsn.com</p>
          </div>
        </div>
        <div className="col-12 d-flex flex-column py-3 col-md-12 col-lg-4 fotter__user_links">
          <p className="h5 text-uppercase">Usefull link</p>
          <ul className="my-3 list-unstyled">
            <li className="items py-1 ">Home</li>
            <li className="items py-1 ">Orders</li>
            <li className="items py-1 ">Help</li>
            <li className="items py-1 ">Account</li>
          </ul>
        </div>
      </div>
      <div className="row bg-white">
        <div className="col-12 py-3  text-center col-lg-6 col-md-12  bg-light">
          <p className="text-center  text-black text-capitalize">
            &copy; {new Date().getFullYear()} &nbsp; All Rights are reserved by
            royal agriculture
          </p>
        </div>
        <div className="col-12 py-3 col-lg-6 text-center col-md-12">
          <p className="text-center text-black text-capitalize">
            Bulid with love{" "}
            <FavoriteTwoTone
              sx={{
                color: "red",
                margin: "0 5px",
              }}
            />
            bulid By Mnemonicx
          </p>
        </div>
      </div>
    </div>
  );
}

export default Fotter;
