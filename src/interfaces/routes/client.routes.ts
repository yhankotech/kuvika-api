import { Router, Request, Response } from 'express';
import { ClientController } from '../controllers/clientController';

const clientRoutes = Router();
const client = new ClientController();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autenticação do Cliente
 *     tags: -Cliente
 *     description: Realiza login do cliente com e-mail e senha, retornando um token JWT.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - email
                - password
              properties:
                email:
                  type: string
                  format: email
                  example: cliente@exemplo.com
                password:
                  type: string
                  example: senha123
      responses:
        '200':
          description: Autenticado com sucesso
          content:
            application/json:
              schema:
                type: object
                properties:
                  token:
                    type: string
                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                  client:
                    type: object
                    properties:
                      id:
                        type: string
                        example: c1d2a3...
                      fullName:
                        type: string
                        example: Romeu Cajamba
                      email:
                        type: string
                        example: cliente@exemplo.com
                      phone:
                        type: string
                        example: "923456789"
                      location:
                        type: string
                        example: Luanda
                      createdAt:
                        type: string
                        format: date-time
                        example: 2025-07-02T12:00:00Z
        '400':
          description: Erro de validação nos dados enviados
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    example: Erro de validação
        '401':
          description: Credenciais inválidas
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: string
                    example: Credenciais inválidas
 */

clientRoutes.post('/clients/login', (req: Request, res: Response) => {
  client.login(req, res);
});

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Operations related to clients
 */

/**
 * @swagger
 * /clients:
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
 * /clients:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: List of all clients
 */
clientRoutes.get('/clients', (request: Request, response: Response) => {
  client.getAll(request, response,);
});

/**
 * @swagger
 * /clients/{id}:
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
clientRoutes.get('/clients/:id', (request: Request, response: Response) => {
  client.getById(request, response,);
});

/**
 * @swagger
 * /clients/email/{email}:
 *   get:
 *     summary: Get a client by email
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client found
 *       404:
 *         description: Client not found
 */
clientRoutes.get('/clients/email/:email', (request: Request, response: Response) => {
  client.getByEmail(request, response,);
});

/**
 * @swagger
 * /clients/{id}:
 *   put:
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
clientRoutes.put('/clients/:id', (request: Request, response: Response) => {
  client.update(request, response,);
});

/**
 * @swagger
 * /clients/{id}:
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
clientRoutes.delete('/clients/:id', (request: Request, response: Response) => {
  client.delete(request, response,);
});

export { clientRoutes };
