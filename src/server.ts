import http from "node:http";
import { PORT } from "./config/app.config";
import { app } from "./app";
import socketIo, { socketIoConfig } from "./config/socket.config";
// import database from "./models/index";
import socketAuthMiddleware from "./middleware/socketAuthMiddleware"
import { Socket } from "socket.io";
import redisClient from "./config/redis.config";
import { jwtData } from "./types/auth.type";
import jwt from "jsonwebtoken";
import { SocketServices } from "./services/socket.services";

const server = http.createServer(app);
socketIo.attach(server, socketIoConfig);
socketIo.use(socketAuthMiddleware);

const start = async (): Promise<void> => {
  try {
    socketIo.on("connection", async (socket: Socket) => {
      console.log("A client connected:", socket.id);
      const auth = socket.handshake.auth.Authorization || socket.handshake.headers["authorization"];
      const token = auth && auth.split(" ")[1];
      const data: jwtData = jwt.decode(token) as jwtData;
      const SocketService = new SocketServices(socket);
      SocketService.StoreOnlineUser(data);
      redisClient.publish("userOnline", JSON.stringify({ uniqueId: data.uniqueId }))
      const timestamp = new Date();
      socket.on("sentMessage", (data: any) => {
        redisClient.hset(`${data.sender_id}:${data.receiver_id}`, `${timestamp}`, JSON.stringify({ ...data, action: "sent" }));
        console.log("Message received:", data);
        socketIo.to(data.receiver_id).emit("newMessage", data);
        redisClient.hset(`${data.receiver_id}:${data.sender_id}`, `${timestamp}`, JSON.stringify({ ...data, action: "received" }));
      });
      const onlineUsers = await redisClient.hgetall("onlineUsers");
      socketIo.emit("onlineUsers", Object.values(onlineUsers).map((user) => JSON.parse(user)));

      socket.on("disconnect", async () => {
        SocketService.removeOnlineUser(data);
        const onlineUsers = await redisClient.hgetall("onlineUsers");
        console.log("After disconnect:", onlineUsers);
        socketIo.emit("onlineUsers",Object.values(onlineUsers).map((user) => JSON.parse(user)));
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