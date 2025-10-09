import { MessageRepository } from "@/domain/repositories/messageRespository";
import { SendMessageDTO } from "@/http/dtos/messageDto";

export class SendMessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async sendMessage(data: SendMessageDTO) {
    const message = await this.messageRepository.send(data);
    return message;
  }

  async findMessage(senderId: string, recipientId: string) {
    return this.messageRepository.findConversation(senderId, recipientId);
  }

  async deleteMessage(id: string): Promise<void> {
    await this.messageRepository.deleteMessage(id);
  }
}