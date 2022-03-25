import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminMenu from "../Admin/components/AdminMenu";
import Fotter from "./Fotter";
const AdminAuth = () => {
  const isAdmin = useSelector((state) => state.AdminChanger.isAdmin);
  let location = useLocation();
  if (isAdmin)
    return (
      <>
        <AdminMenu />
        <Outlet />
        <Fotter />
      </>
    );
  else return <Navigate to="/royal-admin" state={{ from: location }} />;
};

export default AdminAuth;
