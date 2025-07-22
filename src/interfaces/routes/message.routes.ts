
import { Router, Request, Response } from "express";
import { MessageController } from "@/interfaces/controllers/messageController";
import { ensureAuthenticated } from "@/shared/middleware/authenticate";

const messageRoutes = Router();
const controller = new MessageController();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Operações de envio, listagem e remoção de mensagens
 */

/**
 * @swagger
 * /api/v1/messages:
 *   post:
 *     summary: Enviar uma nova mensagem
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - senderId
 *               - recipientId
 *               - isFromClient
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Olá, como vai?"
 *               senderId:
 *                 type: string
 *                 format: uuid
 *                 example: "fa40415f-b1b4-4e83-937f-8a5979ec86df"
 *               recipientId:
 *                 type: string
 *                 format: uuid
 *                 example: "c1ddbb43-85cc-4f93-b02d-1f9981f3e6b4"
 *               isFromClient:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Mensagem enviada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno no servidor
 */

messageRoutes.post('/messages', ensureAuthenticated, (request: Request, response: Response) => {
  controller.send(request, response)});


/**
 * @swagger
 * /api/v1/messages/{senderId}/{recipientId}:
 *   get:
 *     summary: Buscar conversa entre dois usuários
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: senderId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do remetente
 *       - name: recipientId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do destinatário
 *     responses:
 *       200:
 *         description: Lista de mensagens da conversa
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno no servidor
 */

messageRoutes.get('/messages/:senderId/:recipientId', ensureAuthenticated, (request: Request, response: Response) => {
  controller.getConversation(request, response)});

/**
 * @swagger
 * /api/v1/messages/{id}:
 *   delete:
 *     summary: Deletar uma mensagem
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da mensagem
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Mensagem deletada com sucesso
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno no servidor
 */

messageRoutes.delete('/messages/:id', ensureAuthenticated, (request: Request, response: Response) => {
  controller.delete(request, response)});

export { messageRoutes };
