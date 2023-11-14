// import React from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";

// const ProtectedRoute: React.FC<any> = ({
//   path,
//   component: Component,
//   render,
//   ...rest
// }) => {
//   //   const emailId = localStorage.getItem("emailId");
//   const emailId = false;

//   return (
//     <Route
//       exact
//       path={path}
//       {...rest}
//       render={(props: any) => {
//         if (!emailId) return <Navigate to="/loginPage" />;
//         return Component ? <Component {...props} /> : render(props);
//       }}
//     />
//   );
// };
// export default ProtectedRoute;

export const PrivateRoute: React.FC<any> = ({ component, children, path }) => {
  // const isAuthenticated = false;
  console.log("path", children, component);

  const emailId = localStorage.getItem("emailId");
  console.log("emailId", emailId);

  if (emailId) {
    console.log("component ", component == "auth");

    return <Navigate to="/room-auth" />;
  }
  // if (emailId) {
  // } else {
  //   return <Navigate to="/" />;
  // }
  return children;
};
