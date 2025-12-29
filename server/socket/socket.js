import { Server } from "socket.io";
import dotenv from "dotenv";
import http from "http";
import express from "express";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.URL || "http://localhost:5173",
    credentials: true,
  },
});

const userSocketMap = new Map();

io.on("connection", (socket) => {
  const { userId } = socket.handshake.query;

  console.log("🟢 New socket connected");
  console.log("Socket ID:", socket.id);
  console.log("User ID:", userId);

  if (userId) {
    if (!userSocketMap.has(userId)) {
      userSocketMap.set(userId, new Set());
      console.log(`➕ New user added: ${userId}`);
    }

    userSocketMap.get(userId).add(socket.id);
    console.log(
      `📌 Socket added for user ${userId}:`,
      [...userSocketMap.get(userId)]
    );
  }

  console.log("👥 Online users:", [...userSocketMap.keys()]);
  io.emit("getOnlineUsers", [...userSocketMap.keys()]);

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected");
    console.log("Socket ID:", socket.id);
    console.log("User ID:", userId);

    if (!userId) return;

    const sockets = userSocketMap.get(userId);
    sockets?.delete(socket.id);

    console.log(
      `➖ Socket removed for user ${userId}:`,
      sockets ? [...sockets] : []
    );

    if (sockets?.size === 0) {
      userSocketMap.delete(userId);
      console.log(`❌ User removed completely: ${userId}`);
    }

    console.log("👥 Online users:", [...userSocketMap.keys()]);
    io.emit("getOnlineUsers", [...userSocketMap.keys()]);
  });
});

export { io, app, server };
