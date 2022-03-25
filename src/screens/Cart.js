import { Button, Divider, Rating } from "@mui/material";
import React from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";

const Cart = () => {
  const Fav = useSelector((state) => state.OrderChanger.wishlist);
  return (
    <div className="Orders">
      <div className="container mt-3  rounded shadow-sm orders__container">
        <p className="fs-3 py-4 fw-bold text-uppercase">
          {Fav?.length + " "} items in cart
        </p>
        <div className="row">
          {Fav.map((order) => (
            <div className="col-12 py-4 border-bottom border-1 px-2 d-flex">
              <div className="orders__image center">
                <Image
                  style={{
                    width: "100px",
                    objectFit: "fill",
                    height: "100px",
                  }}
                  src={order.imageUrl}
                  alt={order.proName}
                />
              </div>
              <div className="orders__info  px-4  d-flex  flex-column algin-items-center">
                <p className="fs-5">{order.proName}</p>

                <span className="text-secondary d-block small ">
                  {order.desc}
                </span>
                <Rating readOnly value={order.rating} />
              </div>
              <Divider />
            </div>
          ))}
        </div>
        <Button variant="contained" color="primary">
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default Cart;
