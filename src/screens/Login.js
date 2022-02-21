import React, { useState ,useEffect} from 'react';
import "./Login.css"
import login_img from "./../assets/secure.svg";
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { signInWithEmailAndPassword } from 'firebase/auth'
import PersonIcon from "@mui/icons-material/Person"
import { Auth } from "../firebase"
import { useDispatch } from 'react-redux';
import { addUser, deleteUser } from '../action/Actions';


function Login() {
    const dispatch = useDispatch()
    const [passShow, setPassShow] = useState(false);
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [formValues, setFormvalues] = useState({
        username: "",
        password: "",
    })
    useEffect(()=>{
        if(Auth.currentUser){
            window.location = '/'
        }
    },[])
    const buttonSubmit = e => {
        e.preventDefault();
        setLoading(true)
        Signin();
    }
    const handelChange = (e) => {
        const { id, value } = e.target;
        setFormvalues({
            ...formValues,
            [id]: value
        })
    }
    const handelErros = () => {
        const errors = {}
        if (!formValues.username) {
            errors.username = "username required"
        }
        if (!formValues.password) {
            errors.password = "password is required"
        }
        return errors
    }
    const Signin = (e) => {
        if (Object.keys(errors).length === 0) {
            signInWithEmailAndPassword(Auth, formValues.username, formValues.password)
                .then(user => {
                    setLoading(false)
                    dispatch(addUser(user.user))
                    window.location = '/'

                })
                .catch(err => {
                    setErrors({
                        ...errors,
                        username: err.code.slice(5).replaceAll(/-/g, " ")
                    })
                    setLoading(false)
                    dispatch(deleteUser())
                    window.location = '/login'
                })

        }
    }


    return <div className='login container-fluid text-dark'>
        <div className="login__warpper container shadow-lg ">
            <div className="row">
                <div className="login__right text-center py-2 px-2 col-12 col-md-12 col-lg-6">
                    <p className="  we_respect text-center"> We respect your privacy</p>
                    <img src={login_img} className="img-fluid mx-auto mt-5" alt="Login" />
                </div>
                <div className="login__left px-3 py-3 col-12 col-md-12 col-lg-6">
                    <p className="h5  text-center text-uppercase">
                        Login
                    </p>
                    <div className="form-group">
                        <label htmlFor="username"><PersonIcon
                            sx={style}
                        /></label>
                        <input type="text" name="username" id="username"
                            className="form-control" placeholder="email"
                            value={formValues.username}
                            onChange={handelChange}
                            onBlur={() => {
                                setErrors(handelErros())
                            }}
                            aria-describedby="helpId" />

                    </div>
                    <span className="helper">{errors.username}</span>

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
                            'text'} name="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            value={formValues.password}
                            onChange={handelChange}
                            onBlur={() => {
                                setErrors(handelErros())
                            }}
                            aria-describedby="helpId" />

                    </div>
                    <span className="helper">{errors.password}</span>

                    <div className="login__buttons text-center">
                        <button className=" login__button"
                            onClick={buttonSubmit}
                        >{loading ? "loading..." : "Login"}</button>
                        <p className="text-capitalize my-3">or</p>
                        <button className=" login__button register__button"
                            onClick={
                                e => {
                                    e.preventDefault();
                                    window.location.href = 'register'
                                }
                            }
                        >Register</button>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default Login;

const style = {
    margin: "0 10px ",
}