import { Router, Request, Response } from 'express';
import { ClientController } from '@/interfaces/controllers/clientController';
import { ensureAuthenticated } from "@/shared/middleware/authenticate";

const clientRoutes = Router();
const client = new ClientController();

/**
 * @swagger
 * /api/v1/clients/login:
 *   post:
 *     summary: Autenticação do Cliente
 *     tags:
 *       - Cliente
 *     description: Realiza login do cliente com e-mail e senha, retornando um token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: cliente@exemplo.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       '200':
 *         description: Autenticado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 client:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: c1d2a3...
 *                     fullName:
 *                       type: string
 *                       example: Romeu Cajamba
 *                     email:
 *                       type: string
 *                       example: cliente@exemplo.com
 *                     phone:
 *                       type: string
 *                       example: "923456789"
 *                     location:
 *                       type: string
 *                       example: Luanda
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-07-02T12:00:00Z
 *       '400':
 *         description: Erro de validação nos dados enviados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro de validação
 *       '401':
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Credenciais inválidas
 */


clientRoutes.post('/login', (request: Request, response: Response) => {
  client.login(request, response);
});

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Operations related to clients
 */

/**
 * @swagger
 * /api/v1/clients:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Client created successfully
 */
clientRoutes.post('/', (request: Request, response: Response) => {
  client.create(request, response,);
});

/**
 * @swagger
 * /api/v1/clients:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: List of all clients
 */
clientRoutes.get('/', ensureAuthenticated, (request: Request, response: Response) => {
  client.getAll(request, response,);
});

/**
 * @swagger
 * /api/v1/clients/{id}:
 *   get:
 *     summary: Get a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client found
 *       404:
 *         description: Client not found
 */
clientRoutes.get('/:id', ensureAuthenticated, (request: Request, response: Response) => {
  client.getById(request, response,);
});

/**
 * @swagger
 * /api/v1/clients/email:
 *   get:
 *     summary: Buscar cliente por e-mail
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: email
 *         in: query
 *         required: true
 *         description: E-mail do cliente
 *         schema:
 *           type: string
 *           format: email
 *           example: cliente@exemplo.com
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: E-mail ausente ou inválido
 *       404:
 *         description: Cliente não encontrado
 */
clientRoutes.get('/email', ensureAuthenticated,(request: Request, response: Response) => {
  client.getByEmail(request, response,);
});

/**
 * @swagger
 * /api/v1/clients/{id}:
 *   patch:
 *     summary: Update a client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client updated
 */
clientRoutes.patch('/:id', ensureAuthenticated, (request: Request, response: Response) => {
  client.update(request, response,);
});

/**
 * @swagger
 * /api/v1/clients/{id}:
 *   delete:
 *     summary: Delete a client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Client deleted
 */
clientRoutes.delete('/:id', ensureAuthenticated, (request: Request, response: Response) => {
  client.delete(request, response,);
});

/**
 * @swagger
 * /api/v1/clients/me/{userId}:
 *   get:
 *     summary: Retorna o perfil do usuário autenticado
 *     tags: [Perfil]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Perfil retornado com sucesso
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Usuário não encontrado
 */

clientRoutes.get('/me/:userId', ensureAuthenticated, (request: Request, response: Response) => {
  client.profile(request, response,);
});

/**
 * @swagger
 * /api/v1/clients/logout:
 *   post:
 *     summary: Realiza o logout do usuário
 *     tags:
 *       - Autenticação
 *     description: Remove o cookie com o token JWT e encerra a sessão do usuário autenticado (Cliente).
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso.
 *       401:
 *         description: Token inválido ou inexistente.
 */

clientRoutes.get('/logout', ensureAuthenticated, (request: Request, response: Response) => {
  client.logout(request, response,);
});

/**
 * @swagger
 * /activate:
 *   post:
 *     summary: Ativa a conta de um cliente
 *     description: Recebe o email e o código de ativação enviados por email para confirmar a conta do cliente.
 *     tags:
 *       - Client
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               code:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Conta ativada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Conta ativada com sucesso!
 *       400:
 *         description: Código inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Código de ativação inválido!
 *       404:
 *         description: Cliente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Cliente não encontrado!
 */

clientRoutes.post("/activate", (request: Request, response: Response) => {
  client.activate(request, response);
});

export { clientRoutes };
