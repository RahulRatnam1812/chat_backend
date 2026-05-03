import { Server } from 'socket.io';

export const socketIoConfig = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    }, 
};

export default new Server();