import http from "node:http";
import { PORT } from "./config/app.config";
import { app } from "./app";
import socketIo, { socketIoConfig } from "./config/socket.config";
// import database from "./models/index";

const server = http.createServer(app);
socketIo.attach(server, socketIoConfig);

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