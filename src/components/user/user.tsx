import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";

import "./user.css";
import { useGlobalContext } from "../../context/context";

interface User {
  uuId: string;
  userName: string;
  isLoggedIn: boolean;
}

export const UserComponent = () => {
  const navigate = useNavigate();
  const { name, setName } = useGlobalContext();

  const [user, setUser] = useState<User>({
    uuId: "",
    userName: "",
    isLoggedIn: false,
  });
  const emailId = localStorage.getItem("emailId");

  useEffect(() => {
    if (!emailId) navigate("/");
  }, [emailId]);

  const handleSubmit = () => {
    if (user.isLoggedIn) {
      setName(user.userName);
      navigate("/editor/" + user.uuId);
    } else {
      if (!user.uuId.trim() || !user.userName.trim()) {
        toast.error("Room ID and username is required");
      } else {
        setName(user.userName);
        navigate("/editor/" + user.uuId);
      }
    }
  };

  const handleSwitchAuth = () => {
    if (user.isLoggedIn) {
      setUser((prevUser) => ({
        ...prevUser,
        uuId: "",
        isLoggedIn: !user.isLoggedIn,
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        uuId: uuid(),
        isLoggedIn: !user.isLoggedIn,
      }));
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    setName("");
    navigate("/");
  };
  return (
    <>
      <header>
        <p>
          <b>Live Code</b>
        </p>
        <button onClick={handleLogout}>Log out</button>
      </header>
      <div className="container">
        <div className="formContainer">
          <h2>{!user.isLoggedIn ? "Join Room" : "Create Room"} </h2>
          <input
            type="text"
            value={user.uuId}
            onChange={(e) =>
              setUser((prevUser) => ({ ...prevUser, uuId: e.target.value }))
            }
            placeholder="Enter Room ID"
            className="input"
          />
          <br />

          <input
            type="text"
            value={user.userName}
            onChange={(e) =>
              setUser((prevUser) => ({ ...prevUser, userName: e.target.value }))
            }
            placeholder="Enter User Name"
            className="input"
          />
          <br />
          <button onClick={handleSubmit} className="button">
            {user.isLoggedIn ? " Create Room" : " Join Room"}
          </button>
          <p className="switchAccount">
            {!user.isLoggedIn ? "Create New Room?" : " Have Room ID?"}
            <span onClick={() => handleSwitchAuth()}>
              {!user.isLoggedIn ? " Create Room" : " Join Room"}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};
