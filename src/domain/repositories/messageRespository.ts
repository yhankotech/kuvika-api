import { Message } from "@/domain/entities/message";
import { SendMessageDTO } from "@/interfaces/dtos/messageDto";

export interface MessageRepository {
  send(data: SendMessageDTO): Promise<Message>;
  findConversation(senderId: string, recipientId: string): Promise<Message[]>;
  deleteMessage(id: string): Promise<void>;
}
