import React from 'react';
import "./Product.css"
import Proimg from "./../assets/flywinpr.jpg";
import { Card } from "react-bootstrap"
import { Rating } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
function Products() {
    return (
        <div className="d-flex  flex-column justify-content-center
        algin-items-center
        col-md-4 col-lg-3 col-12 my-3 "  >
            <Card className="single_product border-0 shadow-sm">
                <Card.Img className="products__image img-fluid" src={Proimg} />
                <Card.Body>
                    <Card.Title className="h5 text-uppercase w-75  products__title">
                        Products
                    </Card.Title>
                    <Card.Subtitle className=" text-truncate">
                        <p className="products__desc">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, sit!
                        </p>
                    </Card.Subtitle>
                    <Card.Title className="h5 my-1 text-uppercase w-75  products__title">
                        <p className="products__price">
                            <CurrencyRupeeIcon />
                            455.00
                        </p>
                    </Card.Title>
                    <Card.Subtitle><Rating value={4} readOnly /></Card.Subtitle>
                </Card.Body>
                <button

                    className=" Button-1 ln-1 rounded-0 justify-content-center align-content-center  d-flex w-100">Buy Now</button>
            </Card>


        </div>
    );
}

export default Products;
