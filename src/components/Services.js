import React from "react";
import "./Services.css";
import persnolCare from "../assets/girl.jpg";
import Agriculture from "../assets/former.jpg";
import Beauty from "../assets/beauty.jpg";
import { ArrowForward } from "@mui/icons-material";

function Services() {
  return (
    <div className="services container-fluid text-dark">
      <p className="h4 text-center my-5 text-dark text-uppercase ">
        Popular Categories
      </p>
      <div className="row my-5">
        <div className=" service__item col-md-3  col-sm-6">
          <div className=" s bg-white rounded shadow-sm d-flex ">
            <div className="services__image_holder d-flex flex-column">
              <img src={persnolCare} alt="persnol care" />
              <h4 className="services__title">Persnol care</h4>
            </div>
            <div className="arrow-icon ">
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="service__item col-md-3 bg-whit col-sm-6">
          <div className=" bg-white rounded shadow-sm  d-flex">
            <div className="services__image_holder d-flex flex-column">
              <img src={Agriculture} alt="persnol care" />
              <h4 className="services__title">Agriculture</h4>
            </div>
            <div className="arrow-icon ">
              <ArrowForward />
            </div>
          </div>
        </div>
        <div className="service__item col-md-3 bg-whit col-sm-6">
          <div className=" bg-white rounded shadow-sm d-flex ">
            <div className="services__image_holder d-flex flex-column">
              <img src={Beauty} alt="persnol care" />
              <h4 className="services__title">Beauty</h4>
            </div>
            <div className="arrow-icon ">
              <ArrowForward />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
