import http from "node:http";
import { PORT } from "./config/app.config";
import { app } from "./app";
// import database from "./models/index";
import { Server } from "socket.io";

import { socketConfig } from "./config/socket.config";
import { socketInitialization } from "./middleware/socketInitialization";

const server = http.createServer(app);
const io = new Server();
io.attach(server, socketConfig);
io.use(socketInitialization)
// const onlineUsers = new Map();
const onlineUsers: Record<string, string> = {};
io.on("connection", (socket) => {
  console.log("connectd")
  const uniqueId = socket.data.user.uniqueId;
  console.log("uniqueId", uniqueId);
  console.log("socket", socket.id);
  if(!uniqueId){
     socket.disconnect(true);
     return;
  }

  // onlineUsers.set(uniqueId, socket.id);
  // console.log("onlineUsers", onlineUsers);
  // io.emit("online_users", Array.from(onlineUsers.keys()));
  // socket.on("disconnect", () => {
  //   onlineUsers.delete(uniqueId);
  //   io.emit("online_users", Array.from(onlineUsers.keys()));
  //   console.log("User disconnected", socket.id);
  // });

  onlineUsers[uniqueId] = socket.id  
  io.emit("online_users", Object.keys(onlineUsers))

  socket.on("disconnect", () => {
    if (onlineUsers[uniqueId] === socket.id) {
      delete onlineUsers[uniqueId];
      io.emit("online_users", Object.keys(onlineUsers))
    }
  })
});

const start = async (): Promise<void> => {
  try {
    // await database.sync({ force: false });

    server.listen(PORT, () => {
      // console.timeEnd("serverStart")
      console.log(`🚀 Server is running on http://localhost:${PORT}`);

    });
  } catch (error) {
    console.error(error);
    // process.exit(1);
  }
};
void start();