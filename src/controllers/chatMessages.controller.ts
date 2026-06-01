import { Request, Response } from 'express';
import redisClient from '../config/redis.config';
export class ChatMessagesController {
    public static async getChatMessages(req: Request, res: Response) {
        try {
            const { sender_id, receiver_id } = req.params;
            // Fetch messages from Redis based on sender_id and receiver_id
            // Assuming you have a Redis client instance available as `redisClient`
            const data = await redisClient.hgetall(`${sender_id}:${receiver_id}`);
            res.status(200).json({ success: true, status: "success", data: data });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });

        }
    }

    public static async getOnlineUsers(req: Request, res: Response) {
        // console.log("getOnlineUsers called");
        try {
            // const data = await redisClient.hkeys("onlineUsers");
            const data = await redisClient.hgetall("onlineUsers");
            // res.status(200).json({success:true,status:"success",message:"Oneline users fetched successfully",data:data})
            const users = Object.values(data).map((value)=>{
                const user = JSON.parse(value);
                return {
                    uniqueId:user.uniqueId,
                    timestamp:user.iat,
                    status:true
                }
            })
            res.status(200).json({success: true,data: users});

        } catch (error) {
            console.error("error while getting online users ", error);
            res.status(500).json({ success: false, message: "Internal server error" })

        }
    }
}