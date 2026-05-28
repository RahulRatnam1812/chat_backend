import { Socket } from "socket.io";
import { jwtData } from "../types/auth.type";
import redisClient from "../config/redis.config";

export class SocketServices {
    private socket: Socket | null = null;
    constructor(socket: Socket) {
        this.socket = socket;
    }
    public StoreOnlineUser(onlineUser: jwtData) {
        if(this.socket) {
            redisClient.hset("onlineUsers", onlineUser.uniqueId, JSON.stringify(onlineUser));
            // const userId = this.socket.handshake.query.userId;
            // onlineUsers[userId] = this.socket.id;
        }
    }

    public removeOnlineUser(onlineUser: jwtData) {
        if (this.socket) {
             redisClient.hdel("onlineUsers", onlineUser.uniqueId);
        }
    }
}