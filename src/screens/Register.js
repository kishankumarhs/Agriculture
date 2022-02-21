import React, { useState ,useEffect } from 'react';
import "./Register.css";
import login_img from "./../assets/wecome.svg";
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import AddLink from "@mui/icons-material/AddLink"
import PersonIcon from '@mui/icons-material/Person';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Auth, Db } from "./../firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useParams ,useNavigate} from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useDispatch } from "react-redux"
import { addUser, deleteUser } from '../action/Actions';

const Register = () => {
    const [formValues, setFormvalues] = useState({
        username: "",
        password: "",
        conpassword: "",
        email: "",

    })
    const navigate =useNavigate()
    const dispatch = useDispatch()
    const [passShow, setPassShow] = useState(false);
    const { reffered } = useParams()
    const [refferedBy, setRefferedBy] = useState(reffered ?? "")
    const [refferalCode, setRefferalCode] = useState("");
    const [errors, setErrors] = useState({});
    const [codeGenrated, setCodeGenrated] = useState(false);
    const [loading, setLoading] = useState(false)
    const validate = (form) => {
        const errors = {}
        if (!form.username) {
            errors.username = "Name is required"

        }
        if (form.email) {
            if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))) {
                errors.email = "Invalid email"
            }
        } else {

            errors.email = "email required"

        }
        if (form.password) {
            if (!(form.password.length >= 4)) {
                errors.password = "password must 4 have  charecters"
            }
            else if (!(/\W|_/g.test(form.password))) {
                errors.password = "password must have 1 special charecters"
            }
        } else {

            errors.password = "password required"

        }
        if (form.conpassword) {
            if (!(form.password === form.conpassword)) {
                errors.conpassword = "password doesn't match"

            }
        }
        return errors;
    }
    const _onBlur = () => {
        setErrors(validate(formValues))
    }
    const genrateRefferalcode = () => {
        const makeid = (length) => {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() *
                    charactersLength));
            }
            return result;
        }

        const checkRefferalCode = async () => {
            setRefferalCode(makeid(6));
            const q = query(collection(Db, "users"), where("refferal", "==", refferalCode));
            const snapShot = await getDocs(q);
            if (snapShot.empty) {
                setCodeGenrated(true)
            }
            else {
                return checkRefferalCode()
            }


        }

        checkRefferalCode()
    }
     
    const buttonSubmit = e => {
        e.preventDefault();
        setLoading(true)
        genrateRefferalcode()
        if (Object.keys(errors).length === 0 && codeGenrated) {

            createUserWithEmailAndPassword(Auth, formValues.email, formValues.password)
                .then(userCred => {
                    const user = userCred.user;
                    dispatch(addUser(user))
                    setLoading(false)
                    navigate("/getmoreinfo", {
                        ...user, cred: {
                            refferalCode,
                            refferedBy,
                    }})



                })
                .catch(e => {
                    setErrors({
                        ...errors,
                        username: e.code.slice(5).replaceAll(/-/g, " ")
                    })
                    setLoading(false)
                    dispatch(deleteUser({}))
                    window.location = '/register'



                })
        }
    }

    const handelChange = (e) => {
        const { id, value } = e.target;
        setFormvalues({
            ...formValues,
            [id]: value
        })
    }
    return <div className="register login container-fluid text-dark">
        <div className="container login__warpper rounded-1 shadow-large">
            <div className=" row  ">
                <div className="login__right text-center py-2 px-2 col-12 col-md-12 col-lg-6">
                    <p className="we_respect">Join Us Build Your Future  </p>
                    <img src={login_img} className="img-fluid mt-5" alt="Login" />
                </div>
                <div className="login__left py-3 px-4 col-12 col-md-12 col-lg-6">
                    <p className="h5  text-center text-uppercase">
                        Join Us
                    </p>
                    <form >

                        <div className="form-group">
                            <label htmlFor="username"><PersonIcon
                                sx={style}
                            /></label>
                            <input type="text" name="username" id="username"
                                className="form-control" placeholder="Name"
                                value={formValues.username}
                                onChange={handelChange}
                                aria-describedby="helpId" />

                        </div>
                        <span className="helper">{errors.username}</span>
                        <div className="form-group">
                            <label htmlFor="email"><AlternateEmailIcon
                                sx={style}
                            /></label>
                            <input type="text" name="email" id="email"
                                className="form-control" placeholder="Email"
                                value={formValues.email}
                                onChange={handelChange}
                                onBlur={_onBlur}
                                aria-describedby="helpId" />

                        </div>
                        <span className="helper">{errors.email}</span>

                        <div className="form-group">
                            <label htmlFor="password"
                                style={{ cursor: "pointer" }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPassShow(!passShow)
                                }}

                            >
                                {
                                    !passShow ?
                                        <Visibility sx={style} /> :
                                        <VisibilityOff sx={style} />
                                }


                            </label>
                            <input type={!passShow ?
                                'password' :
                                'text'} name="password" id="password"
                                className="form-control"
                                placeholder="Password"
                                value={formValues.password}
                                onChange={handelChange}
                                onBlur={_onBlur}
                                aria-describedby="helpId" />


                        </div>
                        <span className="helper">{errors.password}</span>

                        <div className="form-group">
                            <label htmlFor="conpass"
                                style={{ cursor: "pointer" }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPassShow(!passShow)
                                }}

                            >
                                {
                                    !passShow ?
                                        <Visibility sx={style} /> :
                                        <VisibilityOff sx={style} />
                                }


                            </label>
                            <input type={!passShow ?
                                'password' :
                                'text'} name="conpassword" id="conpassword"
                                className="form-control"
                                placeholder="Confrom password"
                                value={formValues.conpassword}
                                onChange={handelChange}
                                onBlur={_onBlur}
                                aria-describedby="helpId" />


                        </div>
                        <span className="helper">{errors.conpassword}</span>

                        <div className="form-group">
                            <label htmlFor="refferalcode"><AddLink
                                sx={style}
                            /></label>
                            <input type="text" name="refferalcode" id="refferalcode"
                                className="form-control" placeholder="refferal code"
                                value={refferedBy.toUpperCase()}
                                disabled={reffered ?? false}
                                onChange={e => {
                                    setRefferedBy(e.target.value);
                                }}
                                aria-describedby="helpId" />

                        </div>

                        <div className="login__buttons mt-4 text-center">

                            <input type='submit' className=" login__button "
                                value={loading ? "Loding..." : "Register"}
                                onClick={buttonSubmit}

                            />
                            <p className="text-capitalize my-3">or</p>
                            <button className=" login__button register__button"
                                onClick={
                                    e => {
                                        e.preventDefault();
                                        window.location.href = 'login'
                                    }
                                }
                            >Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>;
};

export default Register;
const style = {
    margin: "0 10px ",
}