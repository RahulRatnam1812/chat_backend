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
      const timestamp = new Date();
      socket.on("sentMessage", (data: any) => {
        redisClient.hset(`${data.sender_id}:${data.receiver_id}`, `${timestamp}`, JSON.stringify({ ...data, action: "sent" }));
        console.log("Message received:", data);
        socketIo.to(data.receiver_id).emit("newMessage", data);
        redisClient.hset(`${data.receiver_id}:${data.sender_id}`, `${timestamp}`, JSON.stringify({ ...data, action: "received" }));
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