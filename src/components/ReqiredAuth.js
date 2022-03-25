import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Menu from "../components/Menu";
import Fotter from "./Fotter";
const RequfireAuth = () => {
  const user = useSelector((state) => state.ChangeTheUser.user);
  let location = useLocation();
  if (Object.keys(user).length !== 0)
    return (
      <>
        <Menu />
        <Outlet />
        <Fotter />
      </>
    );
  else return <Navigate to="/login" state={{ from: location }} />;
};

export default RequfireAuth;
