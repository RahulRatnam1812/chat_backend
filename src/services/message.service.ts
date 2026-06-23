import Message from "../models/message";

export class MessageService {
  static async createMessage(data: any) {
    console.log("data, data", data);
    return await Message.create({
      senderId: data.sender_id,
      receiverId: data.receiver_id,
      messageType: data.type,
      message: data.message,
      status: 1,
    });
  }

}

// data: sentMessage {
//   sender_id: '4aec8b10-98ab-4c02-8ade-17b3fc117588',
//   type: 'text',
//   message: 'hi',
//   timestamp: '2026-06-23T16:25:44.992Z',
//   status: 'sent'
// }