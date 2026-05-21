import http from "node:http";
import { PORT } from "./config/app.config";
import { app } from "./app";
// import database from "./models/index";
import { Server } from "socket.io";

import {socketConfig} from "./config/socket.config";
import { socketInitialization } from "./middleware/socketInitialization";

const server = http.createServer(app);
const io = new Server();
io.attach(server, socketConfig);
io.use(socketInitialization)

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  console.log("user", socket.data.user);

  socket.on("send_message", (data) => {
    console.log("message", data);

    socket.emit("receive_message", {
      message: data.message,
      user: socket.data.user
    });

    console.log("data", data.message);
     io.to(String(data.userId)).emit("send_particular_message", {
      message: data.message,
    });
  })
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id)
  })


})

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