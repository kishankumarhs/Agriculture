import React, { useState, useEffect } from "react";
import "./Register.css";
import login_img from "./../assets/wecome.svg";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Auth, Db } from "./../firebase";
import { Spinner } from "react-bootstrap";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, deleteUser } from "../action/Actions";
import { doc, setDoc } from "firebase/firestore";
import {
  Button,
  Checkbox,
  FilledInput,
  IconButton,
  InputAdornment,
  InputLabel,
  Slide,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { Link } from "react-router-dom";
const Register = () => {
  const [formValues, setFormvalues] = useState({
    username: "",
    password: "",
    conpassword: "",
    email: "",
    phoneNumber: "",
    city: "",
    pincode: "",
    state: "",
    road: "",
    houseNo: "",
  });
  const [step, setStep] = useState(0);
  const [getMoreInfo, setGetMoreInfo] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passShow, setPassShow] = useState(false);
  const { reffered } = useParams();
  const [refferedBy, setRefferedBy] = useState(reffered ?? "Kishan");
  const [refferalCode, setRefferalCode] = useState("");
  const [errors, setErrors] = useState({});
  const [codeGenrated, setCodeGenrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addressErrors, setAddressErrors] = useState({});
  const [validReg, setValidReg] = useState(false);
  const [valAdd, setvalAdd] = useState(false);
  const [uid, setUid] = useState("");

  useEffect(() => {
    setFormvalues({
      ...formValues,
      refferedBy,
    });
  }, [refferedBy]);

  const validate = (form) => {
    const errors = {};
    if (!form.username) {
      errors.username = "Name is required";
    }
    if (form.email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = "Invalid email";
      }
    } else {
      errors.email = "email required";
    }
    if (form.password) {
      if (!(form.password.length >= 4)) {
        errors.password = "password must 4 have  charecters";
      } else if (!/\W|_/g.test(form.password)) {
        errors.password = "password must have 1 special charecters";
      }
    } else {
      errors.password = "password required";
    }
    if (form.conpassword) {
      if (!(form.password === form.conpassword)) {
        errors.conpassword = "password doesn't match";
      }
    }
    return errors;
  };
  const _onBlur = () => {
    setErrors(validate(formValues));
    setValidReg(true);
  };
  const genrateRefferalcode = () => {
    const makeid = (length) => {
      var result = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    };

    const checkRefferalCode = async () => {
      setRefferalCode(makeid(6));
      const q = query(
        collection(Db, "users"),
        where("refferal", "==", refferalCode)
      );
      const snapShot = await getDocs(q);
      if (snapShot.empty) {
        setFormvalues({
          ...formValues,
          refferal: refferalCode,
        });
        setCodeGenrated(true);
      } else {
        return checkRefferalCode();
      }
    };

    checkRefferalCode();
  };

  const buttonSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    genrateRefferalcode();
    if (Object.keys(addressErrors).length === 0 && codeGenrated) {
      await createUserWithEmailAndPassword(
        Auth,
        formValues.email,
        formValues.password
      )
        .then((userCred) => {
          const user = userCred.user;
          setUid(user);
          dispatch(addUser(user));
          setLoading(false);
          setStep(1);
        })
        .catch((e) => {
          setErrors({
            ...errors,
            username: e.code.slice(5).replaceAll(/-/g, " "),
          });
          setLoading(false);
          dispatch(deleteUser({}));
        });
    }
  };

  const validateAddress = () => {
    const err = {};
    if (!formValues.city) {
      err.city = "City is required";
    }
    if (!formValues.state) err.state = "State is required";

    if (!formValues.pincode) {
      err.pincode = "pincode is required";
    }
    if (!formValues.phoneNumber) {
      err.phoneNumber = "Phone number is required";
    }
    if (!formValues.houseNo) {
      err.houseNo = "house number or Building Name is required ";
    }
    if (!formValues.road) err.road = "Road Name , Area , Colony is required";

    return err;
  };
  const handelChange = (e) => {
    const { id, value } = e.target;
    setFormvalues({
      ...formValues,
      [id]: value,
    });
  };
  const _onAddressBlur = () => {
    setAddressErrors(validateAddress());
    setvalAdd(true);
  };
  const addAddress = async () => {
    setLoading(true);
    if (Object.keys(addressErrors).length === 0 && valAdd) {
      await updateProfile(Auth.currentUser, {
        displayName: formValues.username,
        phoneNumber: formValues.phoneNumber,
      })
        .then(() => {
          setDoc(doc(Db, "users", Auth.currentUser.uid), {
            ...formValues,
            refferalCode,
            refferedBy,
            password: "",
            conpassword: "",
          })
            .then(() => {
              setLoading(false);
              navigate("/");
            })
            .catch((err) => {
              setLoading(false);
              setAddressErrors({
                ...addressErrors,
                phoneNumber: err.message,
              });
            });
        })
        .catch((err) => {
          setLoading(false);
          setAddressErrors({
            ...addressErrors,
            phoneNumber: err.message,
          });
        });
    }
  };
  const steps = ["Register Youerself", "Give us some information"];
  return (
    <div className="register login container-fluid text-dark">
      <div className="row w-100 mt-3 ">
        <Stepper
          activeStep={step}
          sx={{ width: "100%", backgroundColor: "var(--bs-primary))" }}
          spacing={4}
          alternativeLabel
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className="container login__warpper rounded-1 shadow-large">
        <div className=" row ">
          <div className="login__right d-md-none d-lg-flex text-start py-2 px-2 col-12 col-md-12 col-lg-6">
            <p className="we_respect text-capitalize">buy best products </p>
            <img src={login_img} className="img-fluid mt-5" alt="Login" />
          </div>

          <Slide
            direction="right"
            in={step === 1 ? true : false}
            mountOnEnter
            unmountOnExit
            style={{ transitionDelay: step === 1 ? "1500ms" : "0ms" }}
          >
            <div className="login__left  getmore py-3 px-4 col-12 col-md-12 col-lg-6">
              <Stack spacing={2}>
                <TextField
                  variant="filled"
                  label="phone number"
                  fullWidth
                  type="tel"
                  id="phoneNumber"
                  value={formValues.phoneNumber}
                  onChange={handelChange}
                  required
                  error={addressErrors.phoneNumber ? true : false}
                  helperText={addressErrors.phoneNumber}
                  onBlur={_onAddressBlur}
                />
                <TextField
                  variant="filled"
                  fullWidth
                  type="number"
                  sx={{
                    borderBottomColor: "var(--bs-primary)",
                  }}
                  label="pincode"
                  id="pincode"
                  onChange={handelChange}
                  value={formValues.pincode}
                  required
                  error={addressErrors.pincode ? true : false}
                  helperText={addressErrors.pincode}
                  onBlur={_onAddressBlur}
                />
                <TextField
                  variant="filled"
                  fullWidth
                  sx={{
                    borderBottomColor: "var(--bs-primary)",
                  }}
                  label="state"
                  id="state"
                  onChange={handelChange}
                  value={formValues.state}
                  error={addressErrors.state ? true : false}
                  helperText={addressErrors.state}
                  required
                  onBlur={_onAddressBlur}
                />
                <TextField
                  variant="filled"
                  fullWidth
                  sx={{
                    borderBottomColor: "var(--bs-primary)",
                  }}
                  label="city"
                  id="city"
                  value={formValues.city}
                  error={addressErrors.city ? true : false}
                  onChange={handelChange}
                  helperText={addressErrors.city}
                  required
                  onBlur={_onAddressBlur}
                />
                <TextField
                  variant="filled"
                  fullWidth
                  onChange={handelChange}
                  sx={{
                    borderBottomColor: "var(--bs-primary)",
                  }}
                  label="House No.,Building Name"
                  id="houseNo"
                  value={formValues.houseNo}
                  error={addressErrors.houseNo ? true : false}
                  helperText={addressErrors.houseNo}
                  required
                  onBlur={_onAddressBlur}
                />
                <TextField
                  variant="filled"
                  fullWidth
                  sx={{
                    borderBottomColor: "var(--bs-primary)",
                  }}
                  error={addressErrors.road ? true : false}
                  helperText={addressErrors.road}
                  onChange={handelChange}
                  label="Road Name , Area , Colony"
                  id="road"
                  value={formValues.road}
                  required
                  onBlur={_onAddressBlur}
                />
                <div className="login__buttons mt-4 text-center">
                  <button
                    className=" login__button shadow-sm"
                    onClick={addAddress}
                  >
                    {loading ? (
                      <Spinner
                        animation="border"
                        size="sm"
                        style={{ color: "var(--bs-primary)" }}
                      />
                    ) : (
                      "register"
                    )}
                  </button>
                  <p className="fs-6 mt-2">
                    Allready have Account
                    <Link
                      to="/login"
                      style={{
                        color: "var(--bs-secondary)",
                        fontWeight: 600,
                        padding: "0 10px",
                      }}
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </Stack>
            </div>
          </Slide>
          <Slide
            direction="left"
            in={step === 0 ? true : false}
            mountOnEnter
            unmountOnExit
          >
            <div className="login__left  py-3 px-4 col-12 col-md-12 col-lg-6">
              <Stack spacing={4}>
                <TextField
                  variant="filled"
                  label="full name"
                  fullWidth
                  id="username"
                  value={formValues.username}
                  onChange={handelChange}
                  onBlur={_onBlur}
                  error={errors.username ? true : false}
                  helperText={errors.username}
                  required
                />
                <TextField
                  variant="filled"
                  label="email"
                  fullWidth
                  id="email"
                  value={formValues.email}
                  onChange={handelChange}
                  onBlur={_onBlur}
                  error={errors.email ? true : false}
                  helperText={errors.email}
                  required
                />
                <FormControl variant="filled">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <FilledInput
                    id="password"
                    type={passShow ? "text" : "password"}
                    value={formValues.password}
                    onChange={handelChange}
                    onBlur={_onBlur}
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
                <FormControl variant="filled" fullWidth>
                  <InputLabel htmlFor="conpassword">
                    confrom password
                  </InputLabel>
                  <FilledInput
                    id="conpassword"
                    type={passShow ? "text" : "password"}
                    value={formValues.conpassword}
                    onChange={handelChange}
                    onBlur={_onBlur}
                    error={errors.conpassword ? true : false}
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
                  <FormHelperText>{errors.conpassword}</FormHelperText>
                </FormControl>
                <TextField
                  variant="filled"
                  label="refferal code"
                  fullWidth
                  id="refferalcode"
                  value={refferedBy.toUpperCase()}
                  disabled={reffered ?? false}
                  onChange={(e) => {
                    setRefferedBy(e.target.value);
                  }}
                />

                <div className="agreeTerx mt-3 d-flex  ">
                  <Checkbox size="small" />
                  <p style={{ fontSize: 11 }}>
                    By Checking this , I agree to RoyalAgriclture Terms of
                    Service and Privacy Policy.
                  </p>
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
                      "Next"
                    )}
                  </button>
                  <p className="fs-6 mt-2">
                    Allready have Account
                    <Link
                      to="/login"
                      style={{
                        color: "var(--bs-secondary)",
                        fontWeight: 600,
                        padding: "0 10px",
                      }}
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </Stack>
            </div>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default Register;
const style = {
  margin: "0 10px ",
};
