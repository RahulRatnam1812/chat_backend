import { Server, Socket } from "socket.io";


import Jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/app.config";
export const socketInitialization = (socket: Socket, next: (err?: Error) => void) => {

    try {
        console.log("socket.handshake", socket.handshake.headers.authorization)
        const token = socket.handshake.headers.authorization?.split(" ")[1] || socket.handshake.auth?.token;
        if (!token) {
            return next(new Error("Authorization token is required."));
        }
        Jwt.verify(token, JWT_SECRET_KEY);
        const decoded = Jwt.decode(token) as JwtPayload;
        socket.data.user = decoded;
        console.log("decoded",decoded)
        socket.join(decoded.userId);
        console.log("UsersId",decoded.userId)
        next();

    } catch (error) {
        console.log("error", error);
        next(new Error("Invalid Token."))

    }

}