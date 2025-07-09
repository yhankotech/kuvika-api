import { Router, Request, Response, } from 'express';
import { WorkerController } from '../controllers/workerController';
import { ensureAuthenticated } from '../../shared/middleware/authenticate';

const workerRoutes = Router();
const worker = new WorkerController();

/**
 * @swagger
 * tags:
 *   name: Trabalhador
 *   description: Gerenciamento de trabalhadores
 */

/**
 * @swagger
 * /workers/login:
 *   post:
 *     summary: Login do trabalhador
 *     tags: -Trabalhador
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
workerRoutes.post('/workers/login', (request: Request, response: Response) => {
  worker.login(request, response,);
});

/**
 * @swagger
 * /workers/logout:
 *   post:
 *     summary: Realiza o logout do usuário
 *     tags:
 *       - Autenticação
 *     description: Remove o cookie com o token JWT e encerra a sessão do usuário autenticado (trabalhador).
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso.
 *       401:
 *         description: Token inválido ou inexistente.
 */
workerRoutes.post('/workers/logout', (req: Request, res: Response) => {
  worker.logout(req, res);})


/**
 * @swagger
 * tags:
 *   name: Workers
 *   description: Endpoints relacionados aos trabalhadores

 * /workers:
 *   post:
 *     summary: Cria um novo trabalhador
 *     tags: [Workers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *               - phoneNumber
 *               - serviceTypes
 *               - location
 *               - availability
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@example.com
 *               password:
 *                 type: string
 *                 example: senha123
 *               phoneNumber:
 *                 type: string
 *                 example: '912345678'
 *               serviceTypes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [ "eletricidade", "pintura" ]
 *               location:
 *                 type: string
 *                 example: Luanda - Viana
 *               availability:
 *                 type: string
 *                 example: Seg a Sex, das 08h às 17h
 *     responses:
 *       201:
 *         description: Trabalhador criado com sucesso
 *       400:
 *         description: Requisição inválida
 */


// Passa como callback anônimo para manter tipagem correta
workerRoutes.post('/workers', (request: Request, response: Response) => {
  worker.create(request, response,);
});


/**
 * @swagger
 * /workers:
 *   get:
 *     summary: Retorna todos os trabalhadores
 *     tags: [Workers]
 *     responses:
 *       200:
 *         description: Lista de trabalhadores retornada com sucesso
 *       400:
 *         description: Erro ao buscar trabalhadores
 */
workerRoutes.get('/workers', (req: Request, res: Response) => {
  worker.getAll(req, res);
});

/**
 * @swagger
 * /workers/{id}:
 *   get:
 *     summary: Retorna um trabalhador por ID
 *     tags: [Workers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do trabalhador
 *     responses:
 *       200:
 *         description: Trabalhador encontrado
 *       404:
 *         description: Trabalhador não encontrado
 *       400:
 *         description: Erro na requisição
 */
workerRoutes.get('/workers/:id', (req: Request, res: Response) => {
  worker.getById(req, res);
});

/**
 * @swagger
 * /workers/{id}:
 *   put:
 *     summary: Atualiza um trabalhador existente
 *     tags: [Workers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do trabalhador a ser atualizado
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
 *               phoneNumber:
 *                 type: string
 *               serviceTypes:
 *                 type: array
 *                 items:
 *                   type: string
 *               location:
 *                 type: string
 *               availability:
 *                 type: string
 *     responses:
 *       202:
 *         description: Trabalhador atualizado com sucesso
 *       400:
 *         description: Erro de validação ou atualização
 *       404:
 *         description: Trabalhador não encontrado
 */
workerRoutes.put('/workers/:id', (req: Request, res: Response) => {
  worker.update(req, res);
});

/**
 * @swagger
 * /workers/{id}:
 *   delete:
 *     summary: Deleta um trabalhador
 *     tags: [Workers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do trabalhador
 *     responses:
 *       202:
 *         description: Trabalhador deletado com sucesso
 *       400:
 *         description: Erro na requisição
 */
workerRoutes.delete('/workers/:id', (req: Request, res: Response) => {
  worker.delete(req, res);
});

/**
 * @swagger
 * /profile:
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

workerRoutes.get('/workers/me', ensureAuthenticated, (req: Request, res: Response) => {
  worker.profile(req, res);
});

workerRoutes.get('/search', async (req: Request, res: Response) => {
  worker.search(req, res);
});


export { workerRoutes };
