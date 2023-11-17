import React from "react";
import {  Navigate } from "react-router-dom";

export const PrivateRoute: React.FC<any> = ({ component, children, path }) => {

  const emailId = localStorage.getItem("emailId");

  if (emailId) {
    return <Navigate to="/room-auth" />;
  }

  return children;
};
