import express from 'express';
import { ChatMessagesController } from '../controllers/chatMessages.controller';
export const chatMessageRoute= express.Router();

chatMessageRoute.get("/:sender_id/:receiver_id", ChatMessagesController.getChatMessages);
chatMessageRoute.get("/online-users", ChatMessagesController.getOnlineUsers);