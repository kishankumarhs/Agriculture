import { Divider, Rating } from "@mui/material";
import React from "react";
import { Image } from "react-bootstrap";
import "./orders.css";

const Orders = () => {
  const Orders = [
    {
      proName: "testing products",
      price: "234",
      delivery: "29",
      desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit dignissimos necessitatibus consectetur officia quos voluptates officiis inventore reiciendis fugit possimus?",
      rating: 3,
      quntity: 2,
      grandTotal: 234 * 2,
      orderDate: "12 feb",
      address:
        "Something road , new village , 577689, shimoga city, vinoba road",
      imageUrl:
        "https://www.fertilizer-machine.net/wp-content/uploads/2018/06/types-of-fertilizer.jpg",
    },
    {
      orderDate: "12 march",

      imageUrl:
        "https://www.fertilizer-machine.net/wp-content/uploads/2018/06/types-of-fertilizer.jpg",
      proName: "testing products",
      price: "234",
      delivery: "29",
      desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit dignissimos necessitatibus consectetur officia quos voluptates officiis inventore reiciendis fugit possimus?",
      rating: 3,
      quntity: 2,
      grandTotal: 234 * 2,
      address:
        "Something road , new village , 577689, shimoga city, vinoba road",
    },
    {
      orderDate: "18 may",

      imageUrl:
        "https://www.fertilizer-machine.net/wp-content/uploads/2018/06/types-of-fertilizer.jpg",
      proName: "testing products",
      price: "234",
      delivery: "29",
      desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit dignissimos necessitatibus consectetur officia quos voluptates officiis inventore reiciendis fugit possimus?",
      rating: 3,
      quntity: 2,
      grandTotal: 234 * 2,
      address:
        "Something road , new village , 577689, shimoga city, vinoba road",
    },
    {
      orderDate: "12 jan",

      imageUrl:
        "https://www.fertilizer-machine.net/wp-content/uploads/2018/06/types-of-fertilizer.jpg",
      proName: "testing products",
      price: "234",
      delivery: "29",
      desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit dignissimos necessitatibus consectetur officia quos voluptates officiis inventore reiciendis fugit possimus?",
      rating: 3,
      quntity: 2,
      grandTotal: 234 * 2,
      address:
        "Something road , new village , 577689, shimoga city, vinoba road",
    },
  ];
  return (
    <div className="Orders">
      <div className="container mt-3  rounded shadow-sm orders__container">
        <p className="display-6 py-4 fw-bold text-uppercase">Your orders</p>
        <div className="row">
          {Orders.map((order) => (
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
                <p
                  className="fw-bold text-capitalize"
                  style={{ fontSize: "0.8rem" }}
                >
                  deliverd on {order.orderDate}
                </p>
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
      </div>
    </div>
  );
};

export default Orders;
