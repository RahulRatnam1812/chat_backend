import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/app.config";

export default async (socket: Socket, next: any) => {
  try {
    const auth = socket.handshake.auth.Authorization || socket.handshake.headers["authorization"];
    const token = auth && auth.split(" ")[1];    
    if (!token) {
      return next(new Error("Authentication error: Token not provided"));
    }
    const verifiedUser = jwt.verify(token, JWT_SECRET_KEY); // Implement this function to verify the token and return user data
    if (!verifiedUser) {
      return next(new Error("Authentication error: Invalid token"));
    }
    const jwtData = jwt.decode(token);
    if(jwtData){
      // socket.join(jwtData.userId)
    }
    next();
  }catch (error) {
    console.error("Socket authentication error:", error);
    next(new Error("Authentication error"));
  }
}