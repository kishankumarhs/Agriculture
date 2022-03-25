import "./App.css";
import "animate.css";
import React, { useEffect, useState } from "react";
import Login from "./screens/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Register from "./screens/Register";
import Home from "./screens/Home";
import AdminLogin from "./Admin/AdminLogin";
import Orders from "./screens/Orders";
import NotFound from "./screens/NotFound";
import RequfireAuth from "./components/ReqiredAuth";
import { onAuthStateChanged } from "firebase/auth";
import { Auth } from "./firebase";
import { addUser, deleteUser } from "./action/Actions";
import AddProduct from "./Admin/AddProduct";
import AdminAuth from "./components/AdminAuth";
import SearchProducts from "./screens/SearchProducts";
import Dashboard from "./Admin/Dashboard";
import AdminProducts from "./Admin/pages/AdminProducts";
import AdminBanners from "./Admin/pages/AdminBanners";
import ShowProducts from "./screens/ShowProduct";
import { Spinner } from "react-bootstrap";
import Profile from "./screens/Profile";
import Cart from "./screens/Cart";

function App() {
  const u = useSelector((state) => state.ChangeTheUser.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(Auth, (user) => {
      if (user) {
        dispatch(addUser(user));
        setLoading(false);
      } else {
        dispatch(deleteUser());
        setLoading(false);
      }
    });
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading">
          <div className="center">
            <Spinner
              animation="border"
              size="md"
              style={{ color: "var(--bs-primary)" }}
            />
            {/* <p className="h2 fw-bold text-capitalize pt-2 text-secondary">
              Buffering..
            </p> */}
          </div>
        </div>
      ) : (
        <Router>
          <div className="App">
            <Routes>
              <Route element={<RequfireAuth />}>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchProducts />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/productdetails" element={<ShowProducts />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cart" element={<Cart />} />
              </Route>
              <Route path="/Login" element={<Login />}></Route>
              <Route path="/register/:reffered" element={<Register />} />
              <Route path="/register/" element={<Register />} />
              <Route path="*" element={<NotFound />} />
              <Route path="royal-admin" element={<AdminLogin />} />
              <Route element={<AdminAuth />}>
                <Route path="/addProduct" element={<AddProduct />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/AdminProducts" element={<AdminProducts />} />
                <Route path="/banners" element={<AdminBanners />} />
              </Route>
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;

// import React from "react";
// import "./App.css";
// const App = () => {
//   return (
//     <div className="App">
//       <h1>hello World</h1>
//       <p>
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit iusto
//         repellat alias velit autem distinctio itaque amet excepturi quo
//         consectetur.
//       </p>
//     </div>
//   );
// };

// export default App;
