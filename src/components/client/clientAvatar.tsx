import React, { useEffect } from "react";
import "./clientAvatar.css";

interface ClientAvatarProps {
  username: string;
}

const ClientAvatar: React.FC<ClientAvatarProps> = ({ username }) => {
  return (
    <div className="avatar-container">
      <div className="avatar">{username.substring(0, 1).toUpperCase()}</div>
      <span className="username">{username}</span>
    </div>
  );
};

export default ClientAvatar;
