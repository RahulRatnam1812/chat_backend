import http from "node:http";
import { PORT } from "./config/app.config";
import { app } from "./app";
import socketIo, { socketIoConfig } from "./config/socket.config";
// import database from "./models/index";
import socketAuthMiddleware from "./middleware/socketAuthMiddleware"
import { Socket } from "socket.io";
import redisClient from "./config/redis.config";

const server = http.createServer(app);
socketIo.attach(server, socketIoConfig);
socketIo.use(socketAuthMiddleware);

const start = async (): Promise<void> => {
  try {
    socketIo.on("connection", (socket: Socket) => {
      console.log("A client connected:", socket.id);

      socket.on("sentMessage", (data: any) => {
        redisClient.hset(socket.id, { message: JSON.stringify(data), timestamp: new Date().toISOString() });
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
redisClient.on('connect', () => {
  console.log('Successfully connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Error occurred while connecting to Redis', err);
});