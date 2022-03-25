import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import InventoryIcon from "@mui/icons-material/Inventory";
import "./showProducts.css";
import {
  Button,
  Divider,
  IconButton,
  Rating,
  Slider,
  Stack,
  TextField,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Products from "../components/Products";
import { doc, updateDoc } from "firebase/firestore";
import { Add, Remove } from "@mui/icons-material";
import { Db } from "../firebase";
const ShowProduct = () => {
  const { state } = useLocation();
  const [value, setValue] = useState(1);
  const [rating, setRating] = useState(0);
  // const [total, setTotal] = useState(state.price * value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // paymentInformation
  function loadScript() {}
  const _rate = (value) => {
    const pro = doc(Db, "products", state.id);
    let ratedPepople = state.ratedPeople ? state.ratedPeople : 0;
    let ratings = {
      rate1: 0,
      rate2: 0,
      rate3: 0,
      rate4: 0,
      rate5: 0,
    };

    switch (value) {
      case 1:
        ratings.rate1 = state.rate1 ? state.rate1 + 1 : 0 + 1;
        ratedPepople += 1;
        upadateRatings();
        break;
      case 2:
        ratedPepople += 1;
        ratings.rate2 = state.rate2 ? state.rate2 + 1 : 0 + 1;
        upadateRatings();
        break;
      case 3:
        ratedPepople += 1;
        ratings.rate3 = state.rate3 ? state.rate3 + 1 : 0 + 1;
        upadateRatings();
        break;
      case 4:
        ratedPepople += 1;
        ratings.rate4 = state.rate4 ? state.rate4 + 1 : 0 + 1;
        upadateRatings();
        break;
      case 5:
        ratedPepople += 1;
        ratings.rate5 = state.rate5 ? state.rate5 + 1 : 0 + 1;
        upadateRatings();
        break;
      default:
        return;
    }

    function upadateRatings() {
      var rate =
        (5 * ratings.rate5 +
          4 * ratings.rate4 +
          3 * ratings.rate3 +
          2 * ratings.rate2 +
          1 * ratings.rate1) /
        (ratings.rate1 +
          ratings.rate2 +
          ratings.rate3 +
          ratings.rate4 +
          ratings.rate5);

      updateDoc(pro, {
        rating: rate,
        ratedPepople,
        ...ratings,
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row ">
        <div className=" productDetails__image col-md-4 col-lg-6 col-sm-12 center  ">
          <img src={state.imageUrl} alt={state.proName} />
        </div>
        <div className=" p-3 productDetails__info col-md-4 col-lg-6 col-sm-12 ">
          <h4 className="text-uppercase fw-bold  ">{state.proName}</h4>
          <div className="productDetails__rating mt-2 d-flex algin-items-center">
            <Rating value={4} readOnly /> {"  "}
            <span>{state.ratedPeople} customers rated</span>
          </div>
          <p className="display-5  mt-3 text-capitalize fw-bolder ">
            <CurrencyRupeeIcon sx={{ fontSize: "2rem" }} />
            {state.price}
          </p>
          <Divider />
          <div className="d-flex flex-row w-100">
            <div className="productDetails__avalible mx-2 mt-2">
              <InventoryIcon
                color={state.stock === "instock" ? "success" : "error"}
              />
              <span
                className={
                  "ms-2" + state.stock === "instock"
                    ? "text-success"
                    : "text-danger"
                }
              >
                {state.stock}
              </span>
            </div>
            <div className="productDetails__avalible mx-2 mt-2">
              <LocalShippingIcon color="secondary" />
              <span className="ms-2 text-secondary">
                {state.delivery}rs delivery charge{" "}
              </span>
            </div>
          </div>
          <div className="total mt-3 w-75">
            <p className="fs-5">Quntity:</p>
            <div className="quntity algin-items-center d-flex flex-row">
              <IconButton
                sx={{ margin: "0 2px" }}
                onClick={() => {
                  setValue(value + 1);
                }}
                variant="outlined"
              >
                <Add />
              </IconButton>
              <input
                type="text"
                style={{
                  width: "50px",
                  height: "40px",
                  border: 0,
                  outline: "none",
                  background: "#fff",
                  textAlgin: "center",
                }}
                size="small"
                disabled
                value={value}
              />
              <IconButton
                sx={{ margin: "0 2px" }}
                onClick={() => {
                  if (value > 1) {
                    setValue(value - 1);
                  }
                }}
                variant="outlined"
              >
                <Remove />
              </IconButton>
            </div>
            {/* <Slider
              aria-label="quntity"
              defaultValue={1}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={100}
              color="secondary"
              value={value}
              style={{ height: "10px" }}
              onChange={handleChange}
            /> */}
            <p className="fs-4  mt-3 text-capitalize fw-bolder">
              total:
              <CurrencyRupeeIcon sx={{ fontSize: "1.6rem" }} />
              {state.price * value}
            </p>
          </div>
          <Stack spacing={4} direction="row">
            <Button variant="contained" color="secondary">
              Add to cart
            </Button>
            <Button variant="contained" color="primary">
              buy now
            </Button>
          </Stack>
        </div>
      </div>
      <div className="  d-flex productDetails__desc shadow-sm  rounded flex-column mt-2 p-3">
        <p className="fs-4 fw-bold">Description</p>
        <Divider />
        <p className="small text-secondary">{state.desc}</p>
      </div>
      <div className=" mb-5  d-flex productDetails__desc shadow-sm  rounded flex-column mt-2 p-3">
        <p className="fs-4 fw-bold">Rate</p>
        <Divider />
        <Rating
          className="mt-4"
          value={state.rating ? state.rating : rating}
          size="large"
          onChange={(evev, val) => {
            setRating(val);
            _rate(val);
          }}
        />
      </div>
      <div className="  p-2 productDetails__semilar row">
        <p className="fs-4 fw-bold text-capitalize">You may like </p>
        <Products values={state} />
      </div>
    </div>
  );
};

export default ShowProduct;
