import { prisma } from "@/infra/database/prisma";
import { MessageRepository } from "@/domain/repositories/messageRespository";
import { SendMessageDTO } from "@/interfaces/dtos/messageDto";
import { MessageMapper } from "@/infra/mappers/messageMapper";

export class PrismaMessageRepository implements MessageRepository {
  async send(data: SendMessageDTO) {
    const message = await prisma.message.create({ data });
    return MessageMapper.toDomain(message);
  }

  async findConversation(senderId: string, recipientId: string) {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId, recipientId },
          { senderId: recipientId, recipientId: senderId },
        ],
      },
      orderBy: { timestamp: "asc" },
    });

    return messages.map(MessageMapper.toDomain);
  }

  async deleteMessage(id: string): Promise<void> {
    await prisma.message.delete({
      where: { id },
    });
  }
}