import { PrismaMessageRepository } from "@/infra/repositories/messageRepository";
import { SendMessageService } from "@/service/messageService";

export function makeMessageService(){
    const repository = new PrismaMessageRepository()
    return new SendMessageService(repository)
}