import React from "react";
import "./NotFound.css";
import { useLocation, useNavigate } from "react-router-dom";
import notfound from "../assets/notFound.png";
const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="not__found">
      <img
        src={notfound}
        className="notFound__img mx-auto img-tumbnail "
        alt="404"
      />

      <p className="h2 not">
        Nothing Found at{" "}
        <span className="text-secondary text-lowercase">
          {location.pathname.slice(1)}
        </span>{" "}
      </p>
      <button
        className=" login__button"
        onClick={(e) => {
          navigate("/");
        }}
      >
        Go to home
      </button>
    </div>
  );
};
export default NotFound;
