import React, { useState } from "react";
import "./auth.css";
import { userLogin, createUser } from "../../services/service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface User {
  emailId: string;
  password: string;
}

export const Auth = () => {
  const [newUser, setNewUser] = useState<boolean>(true);
  const [user, setUser] = useState<User>({
    emailId: "",
    password: "",
  });

  const navigate = useNavigate();
  const onsubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (newUser) {
        const res = await createUser({
          emailId: user.emailId,
          password: user.password,
        });
        console.log("res.data", res.data);
        if (res.data.status == 200) {
          toast.success(`User Register Successfully.`);
          localStorage.setItem("emailId", user.emailId);
          navigate("/room-auth");
        } else {
          toast.error("Some thing went wrong.");
        }
      } else {
        const res = await userLogin({
          emailId: user.emailId,
          password: user.password,
        });
        console.log("res.data", res.data);
        console.log("res.data.status", res.data.status);

        if (res.data.status == 200) {
          toast.success(`User Login Successfully.`);
          navigate("/room-auth");
          localStorage.setItem("emailId", user.emailId);
        } else {
          toast.error("Some thing went wrong.");
        }
      }
    } catch (error: any) {
      console.log("error", error.response.data.data);
      if (error.response.data.status == 400) {
        toast.error(error.response.data.data);
      } else if (error.response.data.status == 409) {
        toast.error(error.response.data.data);
      } else {
        toast.error("Some thing went wrong.");
      }
    }
  };
  const handleSwitchAuth = () => {
    setNewUser(!newUser);
  };

  return (
    <div className="auth-section">
      <div className="wrapper">
        <div className="title">{newUser ? "Signup Form" : "Login Form"}</div>
        <form onSubmit={(e: any) => onsubmit(e)}>
          <div className="field">
            <input
              type="email"
              title="Enter Email ID"
              value={user.emailId}
              onChange={(e) =>
                setUser((prevUser) => ({
                  ...prevUser,
                  emailId: e.target.value,
                }))
              }
              required
            />
            <label>Email Address</label>
          </div>
          <div className="field">
            <input
              type="password"
              title="Enter Password"
              value={user.password}
              onChange={(e) =>
                setUser((prevUser) => ({
                  ...prevUser,
                  password: e.target.value,
                }))
              }
              required
            />
            <label>Password</label>
          </div>

          <br />
          <div className="field">
            <input type="submit" value={newUser ? "Signup" : "Login"} />
          </div>

          <div className="signup-link">
            {!newUser ? "Not a member?" : " Have a Account?"}
            <span onClick={() => handleSwitchAuth()}>
              {!newUser ? " Sign-up now" : " Login"}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
