import React, { useState, useEffect } from "react";
import "./Login.css";
import login_img from "./../assets/secure.svg";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { signInWithEmailAndPassword } from "firebase/auth";
import PersonIcon from "@mui/icons-material/Person";
import { Auth } from "../firebase";
import { useDispatch } from "react-redux";
import { addUser, deleteUser } from "../action/Actions";
import { useNavigate, Link } from "react-router-dom";
import {
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import { Spinner } from "react-bootstrap";

function Login() {
  const dispatch = useDispatch();
  const [passShow, setPassShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formValues, setFormvalues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const buttonSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    Signin();
  };
  const handelChange = (e) => {
    const { id, value } = e.target;
    setFormvalues({
      ...formValues,
      [id]: value,
    });
  };
  const handelErros = () => {
    const errors = {};
    if (!formValues.username) {
      errors.username = "username required";
    }
    if (!formValues.password) {
      errors.password = "password is required";
    }
    return errors;
  };
  const Signin = (e) => {
    if (Object.keys(errors).length === 0) {
      signInWithEmailAndPassword(Auth, formValues.username, formValues.password)
        .then((user) => {
          setLoading(false);
          navigate("/");
        })
        .catch((err) => {
          setErrors({
            ...errors,
            username: err.code.slice(5).replaceAll(/-/g, " "),
          });
          setLoading(false);
          navigate("/login");
        });
    }
  };

  return (
    <div className="login container-fluid text-dark">
      <div className="login__warpper container  ">
        <div className="row">
          <div className="login__right d-sm-none d-md-flex text-center py-2 px-2 col-12 col-md-12 col-lg-6">
            <p className="  we_respect text-center"> We respect your privacy</p>
            <img
              src={login_img}
              className="img-fluid mx-auto mt-5"
              alt="Login"
            />
          </div>
          <div className="login__left px-3 py-3 col-12 col-md-12 col-lg-6">
            <Stack spacing={4}>
              <TextField
                variant="filled"
                label="Email"
                fullWidth
                id="username"
                onBlur={() => {
                  setErrors(handelErros());
                }}
                value={formValues.username}
                onChange={handelChange}
                error={errors.username ? true : false}
                helperText={errors.username}
                required
              />
              <FormControl variant="filled">
                <InputLabel htmlFor="password">Password</InputLabel>
                <FilledInput
                  id="password"
                  type={passShow ? "text" : "password"}
                  value={formValues.password}
                  onBlur={() => {
                    setErrors(handelErros());
                  }}
                  onChange={handelChange}
                  error={errors.password ? true : false}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={(e) => {
                          e.preventDefault();
                          setPassShow(!passShow);
                        }}
                        edge="end"
                      >
                        {passShow ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText>{errors.password}</FormHelperText>
              </FormControl>

              <div className="agreeTerx mt-3 d-flex text-end">
                <Link to="/resetpasword">Forget Password</Link>
              </div>
              <div className="login__buttons mt-4 text-center">
                <button
                  type="button"
                  className=" login__button shadow-sm"
                  onClick={buttonSubmit}
                >
                  {loading ? (
                    <Spinner
                      animation="border"
                      size="sm"
                      style={{ color: "var(--bs-primary)" }}
                    />
                  ) : (
                    "Login"
                  )}
                </button>
                <p className="fs-6 mt-2">
                  Not a member
                  <Link
                    to="/register"
                    style={{
                      color: "var(--bs-secondary)",
                      fontWeight: 600,
                      padding: "0 10px",
                    }}
                  >
                    Get Started
                  </Link>
                </p>
              </div>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

const style = {
  margin: "0 10px ",
};
