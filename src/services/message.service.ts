import Message from "../models/message.model";

export class MessageService {
  static async createMessage(data: {sender_id: string; receiver_id: string; message: string;}) {
    return await Message.create({
      senderId: data.sender_id,
      receiverId: data.receiver_id,
      message: data.message,
    });
  }
}