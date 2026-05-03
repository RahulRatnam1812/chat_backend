import http from "node:http";
import { PORT } from "./config/app.config";
import { app } from "./app";
import socketIo, { socketIoConfig } from "./config/socket.config";
// import database from "./models/index";
import socketAuthMiddleware from "./middleware/socketAuthMiddleware"
import { Socket } from "socket.io";

const server = http.createServer(app);
socketIo.attach(server, socketIoConfig);
socketIo.use(socketAuthMiddleware);

const start = async (): Promise<void> => {
  try {
    socketIo.on("connection", (socket:Socket) => {
      console.log("A client connected:", socket.id);

      socket.on("sentMessage", (data:any) => {
        console.log("Message received:", data);
        socketIo.emit("newMessage", data);
      });
      socket.on("disconnect", () => {
        console.log("A client disconnected:", socket.id);
      });
    });
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