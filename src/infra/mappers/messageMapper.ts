import { Message as PrismaMessage } from "@prisma/client";
import { Message } from "@/domain/entities/message";

export class MessageMapper {
  static toDomain(prismaMessage: PrismaMessage): Message {
    return {
      id: prismaMessage.id,
      content: prismaMessage.content,
      timestamp: prismaMessage.timestamp,
      senderId: prismaMessage.senderId,
      recipientId: prismaMessage.recipientId,
      isFromClient: prismaMessage.isFromClient,
    };
  }
}