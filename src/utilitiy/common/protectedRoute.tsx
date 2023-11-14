import React from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";

export const PrivateRoute: React.FC<any> = ({ component, children, path }) => {
  console.log("path", children, component);

  const emailId = localStorage.getItem("emailId");

  if (emailId) {
    return <Navigate to="/room-auth" />;
  }

  return children;
};
