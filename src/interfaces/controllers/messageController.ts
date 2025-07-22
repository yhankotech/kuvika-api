import { Request, Response } from "express";
import { makeMessageService } from "@/interfaces/factory/messagefactory";
import { AppError } from "@/shared/errors/error";
import { z } from "zod";

export class MessageController {
  async send(request: Request, response: Response) {
    try {
      const sendMessageSchema = z.object({
        content: z.string().min(1, "Conteúdo da mensagem é obrigatório"),
        senderId: z.string().uuid("ID do remetente inválido"),
        recipientId: z.string().uuid("ID do destinatário inválido"),
        isFromClient: z.boolean(),
      });

      const { content, senderId, recipientId, isFromClient } = sendMessageSchema.parse(request.body);

      const service = makeMessageService();

      const message = await service.sendMessage({
        content,
        senderId,
        recipientId,
        isFromClient,
      });

      return response.status(201).json(message);

    } catch (error) {
      if (error instanceof z.ZodError) {
        return response.status(400).json({ error: error.errors });
      }

      throw new AppError("Alguma coisa aconteceu da nossa parte!", 400)
    }
  }

  async getConversation(request: Request, response: Response) {
    try {
      const getConversationSchema = z.object({
        senderId: z.string().uuid("ID do remetente inválido"),
        recipientId: z.string().uuid("ID do destinatário inválido"),
      });

      const { senderId, recipientId } = getConversationSchema.parse(request.params);

      const service = makeMessageService();

      const messages = await service.findMessage(senderId, recipientId);

      if(!messages) throw new AppError("Cliente ou Trabalhador não encontrado", 404)

      return response.status(200).json(messages);

    } catch (error) {
      if (error instanceof z.ZodError) {
        return response.status(400).json({ error: error.errors });
      }
      return response.status(500).json({ error: "Erro interno ao buscar mensagens" });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const deleteMessageSchema = z.object({
        id: z.string().uuid("ID da mensagem inválido"),
      });

      const { id } = deleteMessageSchema.parse(request.params);

      const service = makeMessageService();

      await service.deleteMessage(id);

      return response.status(204).send();
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(400).json({message: "Mensagem não eliminada"});
      }
      return response.status(500).json({ error: "Erro interno ao deletar mensagem" });
    }
  }
}
