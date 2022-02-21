import React from 'react';
import "./Services.css";
import persnolCare from "../assets/girl.jpg"
import Agriculture from "../assets/former.jpg"
import Beauty from "../assets/beauty.jpg"

function Services() {
    return (
        <div className="services container-fluid py-5 bg-dark text-white">
            <div className="d-flex flex-sm-column ">
                <div className="services__image_holder">
                <img src={persnolCare} alt="persnol care" className='img-fluid' />
                </div>
                <div className="text-center info">
                    <h4 className="services__title">
                    Lorem, ipsum.
                    </h4>
                    <p className="services__info">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, doloribus aspernatur quasi cupiditate ratione quis dolorem! Amet ullam nihil doloribus dolor placeat tempore, numquam, fuga velit eaque, suscipit debitis totam.
                    </p>
                </div>
            </div>

                {/* <div className=' row'>
                    <div className="col-sm-12 col-md-6 services__image_holder">
                        <img className="image-fluid" src={persnolCare} alt="Persnal care" />
                    </div>
                    <div className="text-center   justify-content-center algin-items-center flex-column info">
                        <h4 className="services__title">
                            Lorem, ipsum.
                        </h4>
                        <p className="services__info">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores illum laudantium ullam atque quaerat quia, dolorum, et, doloribus earum inventore perferendis modi sint. Officiis eveniet veritatis, a perspiciatis numquam in?
                        </p>
                    </div>
                </div> */}
                {/* <div className=" row  d-flex flex-row flex-sm-column-reverse">
                    <div className="col-lg-6 col-md-12 col-md-12 text-center d-flex justify-content-center algin-items-center flex-column info ">
                        <h4 className="services__title">
                            Lorem, ipsum.
                        </h4>
                        <p className="services__info">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores illum laudantium ullam atque quaerat quia, dolorum, et, doloribus earum inventore perferendis modi sint. Officiis eveniet veritatis, a perspiciatis numquam in?
                        </p>
                    </div>
                    <div className="col-lg-6 col-md-12 col-md-12  services__image_holder">
                        <img className="image-fluid" src={Beauty} alt="Persnal care" />
                    </div>
                </div>
                <div className=" row  d-flex flex-row flex-sm-column">
                    <div className="col-lg-6 col-md-12 col-md-12 services__image_holder">
                        <img className="image-fluid" src={Agriculture} alt="Persnal care" />
                    </div>
                    <div className="col-lg-6 col-md-12 col-md-12 text-center d-flex justify-content-center algin-items-center flex-column  info">
                        <h4 className="services__title">
                            Lorem, ipsum.
                        </h4>
                        <p className="services__info">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores illum laudantium ullam atque quaerat quia, dolorum, et, doloribus earum inventore perferendis modi sint. Officiis eveniet veritatis, a perspiciatis numquam in?
                        </p>
                    </div>
                </div> */}

          
        </div>);
}

export default Services;
