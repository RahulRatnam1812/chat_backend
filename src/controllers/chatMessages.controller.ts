import { Request, Response } from 'express';
import redisClient from '../config/redis.config';
import Message from '../models/message';


import { MessageService } from "../services/message.service";
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
            const users = Object.values(data).map((value) => {
                const user = JSON.parse(value);
                return {
                    uniqueId: user.uniqueId,
                    timestamp: user.iat,
                    status: true
                }
            })
            res.status(200).json({ success: true, data: users });

        } catch (error) {
            console.error("error while getting online users ", error);
            res.status(500).json({ success: false, message: "Internal server error" })

        }
    }

    public static async updateChatMessages(req: Request, res: Response) {
        try {
            const { uniqueId, message } = req.body;

            const updatedMessage = await MessageService.updateMessage(uniqueId, message);
            return res.status(200).json({
                success: true,
                data: updatedMessage,
            });
        } catch (error) {
            console.log("error", error)
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
    public static async deleteChatMessage(req: Request, res: Response) {
        try {
            const { uniqueId } = req.params;
            if (!uniqueId) {
                return res.status(400).json({
                    success: false,
                    message: "uniqueId is required",
                });
            }
            const message = await Message.findOne({ where: { uniqueId } });
            if (!message) {
                return res.status(404).json({
                    success: false,
                    message: "Message not found",
                });
            }

            message.deletedAt = new Date();
            await message.save();
            return res.status(200).json({
                success: true,
                message: "Message deleted successfully",
                // data: message,
            });
        } catch (error) {
            console.error("Error deleting message:", error);

            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
}