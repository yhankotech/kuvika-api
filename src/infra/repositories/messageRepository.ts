import { prisma } from "@/infra/database/prisma";
import { MessageRepository } from "@/domain/repositories/messageRespository";
import { SendMessageDTO } from "@/http/dtos/messageDto";
import { MessageMapper } from "@/infra/mappers/messageMapper";
import { AppError } from "@/shared/errors/error";

export class PrismaMessageRepository implements MessageRepository {
   async send(data: SendMessageDTO) {
    // Verificar existência do remetente
    const senderExists = await prisma.client.findUnique({
      where: { id: data.senderId },
    });

    if (!senderExists) {
      throw new AppError("Remetente não encontrado", 404);
    }

    // Verificar existência do destinatário
    const recipientExists = await prisma.client.findUnique({
      where: { id: data.recipientId },
    });

    if (!recipientExists) {
      throw new AppError("Destinatário não encontrado", 404);
    }

    // Criar mensagem se tudo estiver certo
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