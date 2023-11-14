import React, { useEffect, useState } from "react";
import { UserComponent } from "../components/user/user";
import socket from "../services/socketService";

export const Authentication = () => {
  useEffect(() => {
    // Handling incoming messages from the server
    socket.on("message", (message: any) => {
      console.log("Received message from server:", message);
    });

    // Handling the closure of the connection
    socket.on("close", () => {
      console.log("Connection to the server closed");
    });

    // Clean up the socket event listeners on component unmount
    return () => {
      socket.off("message");
      socket.off("close");
    };
  }, []);

  const sendMessage = () => {
    // Sending a message to the server
    socket.emit("message", "Hello from the client!");
  };

  return (
    <div>
      <UserComponent />
      {/* <button onClick={sendMessage}>Send Message to Server</button> */}
    </div>
  );
};
