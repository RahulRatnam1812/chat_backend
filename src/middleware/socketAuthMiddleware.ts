import { Socket } from "socket.io";
import { JWT_SECRET_KEY } from "../config/app.config";
import jwt from "jsonwebtoken";
import socketIo from "../config/socket.config";

export default async (socket: Socket, next: any) => {
  let authHeader = socket.handshake.auth.Authorization;

  // Todo
  /* 
      IOS Code Auth failed.
      --------------------------------
    */
  if (authHeader === undefined) {
    authHeader = socket.handshake.headers.authorization;
  }
  //END Todo

  const authToken = authHeader?.split(" ")[1];

  if (!authToken || authToken === undefined) {
    return next(new Error("Authentication error: Token not provided"));
  }
  try {
    const verify = jwt.verify(authToken, JWT_SECRET_KEY) as { id: string };
    if (!verify) {
      return next(new Error("Authentication error: Invalid token"));
    }
    let jwtData: any = jwt.decode(authToken);
    let user: any = jwtData;

    if(user && user.uniqueID){
      const sockets = await socket.nsp.adapter.sockets(new Set([user.uniqueID]))
      if (sockets.size > 0) {
        for (const sockId of sockets) {
          const sock = socket.nsp.sockets.get(sockId);
          if (sock) {
            console.log(`Disconnecting old socket: ${sockId}`);
            sock.disconnect(true);
          }
        }
      }
    }

    await socket.join(user.uniqueID);
    socketIo.to(user.uniqueID).emit("socket_ready", { uniqueID: user.uniqueID });
    next();
  } catch (err) {
    // console.log("socket error", err);
    // return next(new Error("Authentication error: Invalid token"));
  }
};
 