//React
import React from "react";

//React-Router
import { Navigate } from "react-router-dom";

//React-Redux
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  
  const isAuthenticated = useSelector((state) => state.user.email);

  return isAuthenticated ? children : <Navigate to="/signin" />;
};
export default PrivateRoute;
