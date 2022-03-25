import React, { useState } from "react";
import { doc, setDoc, collection, getDoc, query } from "firebase/firestore";
import { Db } from "../firebase";
import { useDispatch } from "react-redux";
import {
  PersonPinCircleOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { addAdmin, addUser, deleteAdmin } from "../action/Actions";
import { Spinner } from "react-bootstrap";
import bcrypt from "bcryptjs";
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
const AdminLogin = () => {
  const [forms, setForms] = useState({
    name: "kishan kumar hs ",
    username: "kishankuamr",
    email: "hskishanraj@gmail.com",
    password: "iloveu@_5225",
  });
  const dispatch = useDispatch();
  const [passShow, setPassShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formValues, setFormvalues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const _hasPassword = async () => {
    const salt = await bcrypt.genSalt(6);
    const hashedpassword = bcrypt.hashSync(forms.password, salt);
    setForms({
      ...forms,
      password: hashedpassword,
    });
  };
  const subimtButton = async () => {
    _hasPassword().then(() => {
      setLoading(true);
      setDoc(doc(Db, "Admins", forms.email), {
        name: forms.name,
        username: forms.username,
        password: forms.password,
        email: forms.email,
      })
        .then(() => {
          setLoading(false);
          alert("updated");
        })
        .catch((err) => {
          setLoading(false);
          alert(err.message);
        });
    });
  };

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

  const Signin = async (e) => {
    if (Object.keys(errors).length === 0) {
      const docRef = doc(Db, "Admins", formValues.username);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        let data = docSnap.data();
        if (
          data.email === formValues.username &&
          bcrypt.compare(formValues.password, data.password)
        ) {
          dispatch(addAdmin({ ...data, password: "" }));
          dispatch(addUser({ ...data, password: "" }));
          setLoading(false);
          navigate("/dashboard");
        } else {
          setLoading(false);
          dispatch(deleteAdmin());
          errors.username = "incorrect username or password";
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  };

  return (
    <div className="login container text-dark  ">
      <div className="login__warpper ronded-0 w-50">
        <Stack spacing={4}>
          <p className="h3 text-center">Login</p>
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
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default AdminLogin;
const style = {
  margin: "0 10px ",
};
