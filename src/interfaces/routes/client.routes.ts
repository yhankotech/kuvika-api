import { Router, Request, Response } from 'express';
import { ClientController } from '@/interfaces/controllers/clientController';
import { ensureAuthenticated } from "@/shared/middleware/authenticate";

const clientRoutes = Router();
const client = new ClientController();

/**
 * @swagger
 * /api/v1/login:
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


clientRoutes.post('/clients/login', (request: Request, response: Response) => {
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
clientRoutes.post('/clients', (request: Request, response: Response) => {
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
clientRoutes.get('/clients', ensureAuthenticated, (request: Request, response: Response) => {
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
clientRoutes.get('/clients/:id', ensureAuthenticated, (request: Request, response: Response) => {
  client.getById(request, response,);
});

/**
 * @swagger
 * /api/v1/clients/email:
 *   get:
 *     summary: Get a client by email
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: cliente@exemplo.com
 *     responses:
 *       200:
 *         description: Client found
 *       404:
 *         description: Client not found
 */
clientRoutes.get('/clients/email', ensureAuthenticated,(request: Request, response: Response) => {
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
clientRoutes.patch('/clients/:id', ensureAuthenticated, (request: Request, response: Response) => {
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
clientRoutes.delete('/clients/:id', ensureAuthenticated, (request: Request, response: Response) => {
  client.delete(request, response,);
});

/**
 * @swagger
 * /api/v1/clients/me:
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

clientRoutes.get('/clients/me', ensureAuthenticated, (request: Request, response: Response) => {
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

clientRoutes.get('/clients/logout', ensureAuthenticated, (request: Request, response: Response) => {
  client.logout(request, response,);
});



export { clientRoutes };
