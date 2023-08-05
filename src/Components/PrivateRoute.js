import React from "react";
import { Navigate } from "react-router-dom";
import { getVerificationToken } from "../userAuthServices";

const PrivateRoute = ({ children }) => {
  let token = getVerificationToken();

  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default PrivateRoute;
