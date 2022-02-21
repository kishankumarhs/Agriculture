import './App.css';
import React, { useEffect, useState } from "react"
import Login from './screens/Login';
import { Auth } from "./firebase"
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Register from './screens/Register';
import Home from './screens/Home';
import { useSelector, useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth';
import { addUser, deleteUser } from './action/Actions';
import AdminLogin from './screens/AdminLogin'
import GetMoreInfo from './screens/GetMoreInfo';
import Orders from './screens/Orders';
function App() {
  const user = useSelector(state => state.ChangeTheUser)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(Auth, (User) => {
      if (User) {
        dispatch(addUser(User.currentUser))

      } else {
        dispatch(deleteUser())

      }
    })
    
  }, [])


  return (
    <Router>
      <div className="App">
        <Routes>
          { 
            Object.keys(user).length !== 0 && (
              <Route path='/' element={<Home />} />,
              <Route path='/orders' element={<Orders/>} />
            )
          }


          <Route path='/Login' element={
            <Login />
          } >

          </Route>
          <Route path='/register/:reffered' element={
            <Register />
          } />
          <Route path='/register/' element={
            <Register />
          } />
          <Route path="*" element={<Navigate to={user ? "/" : "login"} />} />
          <Route path="royal-admin" element={<AdminLogin />} />
          <Route path="getInfo/:user" element={<GetMoreInfo />} />
          <Route path="getInfo" element={<GetMoreInfo/>} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
