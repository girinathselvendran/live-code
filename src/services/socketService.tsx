// src/services/socketService.js

import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Replace with your Fastify server URL

export default socket;
