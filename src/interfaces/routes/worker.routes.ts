// src/http/routes/workerRoutes.ts
import { Router, Request, Response, NextFunction } from 'express';
import { WorkerController } from '../controllers/workerController';

const workerRoutes = Router();
const worker = new WorkerController();

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
workerRoutes.post('/workers', (req: Request, res: Response) => {
  worker.create(req, res,);
});

export { workerRoutes };