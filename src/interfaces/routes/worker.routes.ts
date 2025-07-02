// src/http/routes/workerRoutes.ts
import { Router, Request, Response, NextFunction } from 'express';
import { WorkerController } from '../controllers/workerController';

const workerRoutes = Router();
const worker = new WorkerController();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Auth]
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
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       202:
 *         description: Login bem-sucedido
 *       401:
 *         description: Credenciais inválidas
 */
workerRoutes.post('/login', (request: Request, response: Response) => {
  worker.login(request, response,);
});


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

export { workerRoutes };
