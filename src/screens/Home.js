import React, { useEffect } from 'react';
import "./Home.css"
import Menu from './../components/Menu';
import { Carousel } from "react-bootstrap"
import Services from "./../components/Services"
import Products from './../components/Products';
import banner1 from './../assets/banner1.jpg'
import banner2 from './../assets/banner2.jpg'
import banner3 from './../assets/banner3.jpg'
import banner4 from './../assets/banner4.jpg'
import banner5 from './../assets/banner5.jpg'
import Fotter from './../components/Fotter';
import { signOut } from 'firebase/auth';
import { Auth } from '../firebase';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteUser, addUser } from '../action/Actions';

function Home() {
    const User = useSelector(state => state.ChangeTheUser)
    const dispatch = useDispatch();
    return <div className='home'>
        <Menu className="home__nav" />
        <Carousel className="home_carousel">
            <Carousel.Item className="home__car_item">
                <img
                    className="home__cars_img"
                    src={banner1}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="home__cars_img"
                    src={banner2}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="home__cars_img"
                    src={banner3}
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="home__cars_img"
                    src={banner4}
                    alt="fourth slide"
                />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="home__cars_img"
                    src={banner5}
                    alt="fifth slide"
                />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        <Services />
        <div className="products px-5 mb-5">

            <h2 className="products__title text-uppercase my-5 h2 fw-bold">Trending Products            </h2>
            <div className="products__holder row">

                <Products />
                <Products />
                <Products />
                <Products />
                
            </div>
            <div className="container-fluid text-center">
             <button
                    className=" Button Products__btn  mx-auto my-5 border-0 rounded-0">
                    View More
                </button>
            </div>
               

        </div>
        <Fotter />

    </div>;
}

export default Home;
