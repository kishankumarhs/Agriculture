import React, { useState } from "react";
import "./Product.css";
import { Image } from "react-bootstrap";
import { IconButton, Rating, Button } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch } from "react-redux";
import { addProductsToBasket } from "../action/Actions";
function Products(props) {
  const [favClicked, setFavClicked] = useState(false);
  const dispatch = useDispatch();
  const { onclick, key, values } = props;
  return (
    <div
      key={key}
      className="
        col-md-4 col-lg-3 col-12 p-3 "
    >
      <div
        className=" d-flex  flex-column 
        algin-items-center
        single_product "
      >
        <div className="fav__holder">
          <IconButton
            style={{
              borderRadius: "50%",
              background: "#fff",
            }}
            className="shadow-sm"
            onClick={() => {
              setFavClicked(!favClicked);
              dispatch(addProductsToBasket(values));
            }}
          >
            {favClicked ? (
              <FavoriteIcon
                sx={{
                  color: "red",
                }}
                className="fav__button"
              />
            ) : (
              <FavoriteBorderIcon
                sx={{
                  color: "red",
                }}
                className="fav__button"
              />
            )}
          </IconButton>
        </div>
        <div className="image__holder">
          <Image className="products__image" src={values.imageUrl} />
        </div>
        <div className="product__info text-dark px-2" onClick={onclick}>
          <p className=" text-uppercase py-2  products__title">
            {values.proName}
          </p>
          <div className="text-truncate">
            <p className="products__desc">{values.desc}</p>
          </div>
          <p className="h5 my-1 text-uppercase w-75  products__title">
            <p className="products__price">
              <CurrencyRupeeIcon />
              {values.price}.00
            </p>
          </p>
          <span className="d-flex my-3 algin-items-center text-capitalize ">
            <Rating
              value={values?.rating ? values.rating : 0}
              style={{ borderColor: "var(--bs-primary)" }}
              readOnly
            />
            <span className="mx-1 my-1 small ">
              {values.ratedPepople ? values.ratedPepople : 0}
            </span>
          </span>
          {/* <p
          className="fw-500"
          style={{
            fontSize: "0.9rem",
          }}
        >
          {values.delivery === "0" || !values.delivery
            ? "Free Delivery"
            : values.delivery + " Rs for delivery"}
        </p> */}
        </div>
        {/* <div className="d-flex">
        <Button
          onClick={onclick}
          variant="contained"
          color="primary"
          className=" ln-1 rounded-0 center d-flex w-100"
        >
          Buy Now
        </Button>
      </div> */}
      </div>
    </div>
  );
}

export default Products;
