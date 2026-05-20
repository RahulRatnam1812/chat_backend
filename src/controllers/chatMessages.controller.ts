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

}