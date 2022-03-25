import React, { useEffect, useState } from "react";
import "./Home.css";
import { Carousel, Image, Spinner } from "react-bootstrap";
import Services from "./../components/Services";
import Products from "./../components/Products";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { collection, limit, onSnapshot, query } from "firebase/firestore";
import { Db } from "../firebase";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import GppGoodIcon from "@mui/icons-material/GppGood";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { IconButton, Rating } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Home() {
  const isAdmin = useSelector((state) => state.AdminChanger.isAdmin);
  const [admin, setAdmin] = useState(false);
  const [ProductsList, setProductsList] = useState([]);
  const [BannerList, setBannerList] = useState([]);
  const navigate = useNavigate();
  const _getBanner = async () => {
    const q = query(collection(Db, "banners"));
    onSnapshot(q, (proRef) => {
      const newarray = [];
      proRef.forEach((doc) => {
        newarray.push({ ...doc.data(), id: doc.id });
      });
      setBannerList(newarray);
    });
  };

  useEffect(() => {
    _getBanner();
  }, []);
  const _getProducts = async () => {
    const q = query(collection(Db, "products"), limit(10));
    onSnapshot(q, (proRef) => {
      const newarray = [];
      proRef.forEach((doc) => {
        newarray.push({ ...doc.data(), id: doc.id });
      });
      setProductsList(newarray);
    });
  };
  useEffect(() => {
    _getProducts();
  }, []);
  useEffect(() => {
    setAdmin(Object.keys(isAdmin).length !== 0 ? true : false);
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="home">
      <div className="main-olw mb-0">
        <Slider {...settings}>
          {BannerList.map((ban) => (
            <div key={ban.id} className="home__car_item">
              <img
                className=" home__cars_img"
                src={ban.imageUrl}
                alt="First slide"
              />
              <div className="bannerCaption">
                <h3>{ban.bannerName}</h3>
                <p>{ban.bannerDesc}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="whywe conatiner-fluid">
        <p className="h4 text-center mx-5">Why We</p>
        <div className="row">
          <div className="col-md-4 center col-sm-12 p-3 text-center d-flex flex-column">
            <div className="home__icon shadow-sm center rounded p-2">
              <CurrencyRupeeIcon />
            </div>
            <p className="fs-5">best price</p>
            <p className="home__text">
              Unmatched prices for the highest quality products
            </p>
          </div>
          <div className="col-md-4 col-sm-12 center p-3 text-center d-flex flex-column">
            <div className="home__icon  shadow-sm center rounded p-2">
              <GppGoodIcon />
            </div>
            <p className="fs-5">Safe & Secure Experience</p>
            <p className="home__text ">
              64bit of the user data and completely secure payments
            </p>
          </div>
          <div className="col-md-4 col-sm-12 p-3 center text-center d-flex flex-column">
            <div className="home__icon  shadow-sm center rounded p-2">
              <LocalShippingIcon />
            </div>
            <p className="fs-5">Quick Delivery</p>
            <p className="home__text">
              Lighting fast delivery across most PIN codes
            </p>
          </div>
        </div>
      </div>
      <Services />
      <div className="products container-fluid px-5 mb-5">
        <h2 className=" w-100 p-3 text-uppercase  fs-3 fw-bold">
          Trending Products
        </h2>
        <div className="products__holder row">
          {ProductsList.map((pro) => (
            <Products
              onclick={() => {
                navigate("/productdetails", { state: pro });
              }}
              key={pro.id}
              values={pro}
            />
          ))}
        </div>
        <div className="container-fluid text-center">
          <button
            onClick={() => {
              navigate("/search");
            }}
            className=" Button Products__btn  mx-auto my-5 border-0 rounded-0"
          >
            View More
          </button>
        </div>
      </div>
      <div className="newarraivals container-fluid px-5 ">
        <h2 className=" w-100 p-3 text-uppercase  fs-3 fw-bold">
          New arraivals
        </h2>
        {
          !ProductsList ? (
            <div className="w-100" style={{ height: "300px" }}>
              <Spinner
                animation="border"
                size="md"
                style={{ color: "var(--bs-primary)" }}
              />
            </div>
          ) : (
            // <IconButton
            //   onClick={() => {
            //     let container = document.querySelector(".inner");
            //     let translate = 0;
            //     translate += 200;
            //     container.style.transform = "translateX(" + translate + "px" + ")";
            //   }}
            //   className="movebuttonleft"
            // >
            //   <ArrowBack />
            // </IconButton>
            <div className="newarraivals__holder container">
              <Slider
                slidesToShow={
                  window.innerWidth <= 991.98
                    ? window.innerWidth <= 767.98
                      ? 1
                      : 2
                    : 3
                }
                accessibility={true}
                centerPadding="10px"
                dots={false}
                speed={500}
                slidesToScroll={1}
                // nextArrow={<ForwordArrow />}
                // prevArrow={<PreviousArrow />}
              >
                {ProductsList.map((pro) => (
                  <div
                    key={pro.id}
                    className="p-3"
                    onClick={() => {
                      navigate("/productdetails", { state: pro });
                    }}
                  >
                    <div className=" d-flex  flex-column algin-items-center single_product ">
                      <div className="image__holder">
                        <Image className="products__image" src={pro.imageUrl} />
                      </div>
                      <div className="product__info text-dark px-2">
                        <p className=" text-uppercase py-2  products__title">
                          {pro.proName}
                        </p>
                        <div className="text-truncate">
                          <p className="products__desc">{pro.desc}</p>
                        </div>
                        <p className="h5 my-1 text-uppercase w-75  products__title">
                          <p className="products__price">
                            <CurrencyRupeeIcon />
                            {pro.price}.00
                          </p>
                        </p>
                        <span className="d-flex my-3 algin-items-center text-capitalize ">
                          <Rating
                            value={pro?.rating ? pro.rating : 0}
                            style={{ borderColor: "var(--bs-primary)" }}
                            readOnly
                          />
                          <span className="mx-1 my-1 small ">
                            {pro.ratedPepople ? pro.ratedPepople : 0}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )

          // <IconButton
          //   onclick={() => {
          //     let container = document.querySelector(".inner");
          //     let translate = 0;
          //     translate -= 200;
          //     container.style.transform = "translateX(" + translate + "px" + ")";
          //   }}
          //   className="movebuttonright"
          // >
          //   <ArrowForward />
          // </IconButton>
        }
      </div>
      <div className="container">
        <img
          className="w-100 my-3"
          style={{
            height: "200px",
            objectFit: "cover",
          }}
          src={BannerList[0]?.imageUrl}
          alt="offers"
        />
      </div>
      <div className="products container-fluid px-5 mb-5">
        <h2 className=" w-100 p-3 text-uppercase  fs-3 fw-bold">
          Best Sellers
        </h2>
        <div className="products__holder row">
          {ProductsList.map((pro) => (
            <Products
              onclick={() => {
                navigate("/productdetails", { state: pro });
              }}
              key={pro.id}
              values={pro}
            />
          ))}
        </div>
        <div className="container-fluid text-center">
          <button
            onClick={() => {
              navigate("/search");
            }}
            className=" Button Products__btn  mx-auto my-5 border-0 rounded-0"
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
