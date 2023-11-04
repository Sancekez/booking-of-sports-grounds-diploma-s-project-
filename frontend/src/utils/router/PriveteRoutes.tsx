import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

const PriveteRoutes = () => {
   const isAuth = useSelector((state: RootState) => state.isAuth.isAuth);
   const location = useLocation();
   // const navigate = useNavigate();

   // useEffect(() => {
   //    if (!isAuth) {
   //       navigate("/login", { state: { from: location }, replace: true });
   //    }
   // }, [isAuth, navigate, location]);

   return isAuth ? (
      <Outlet />
   ) : (
      <Navigate to="/login" state={{ from: location }} replace />
   );
};

export default PriveteRoutes;
