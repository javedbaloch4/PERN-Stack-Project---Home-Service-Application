import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { userSelector } from "../../redux/features/auth/slice";

const PrivateRoutes = () => {
  const selectedUser = useAppSelector(userSelector);

  return selectedUser.user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
