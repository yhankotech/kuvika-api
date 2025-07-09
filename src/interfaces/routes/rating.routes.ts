import { Router, Request, Response } from "express";
import { RatingController } from "../controllers/ratingController";

const ratingRoutes = Router();
const ratingController = new RatingController();

/**
 * @swagger
 * tags:
 *   name: Avaliações
 *   description: Endpoints relacionados às avaliações dos trabalhadores
 */

/**
 * @swagger
 * /ratings:
 *   post:
 *     summary: Cadastrar uma nova avaliação
 *     tags: [Avaliações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientId
 *               - workerId
 *               - serviceRequestId
 *               - score
 *               - comment
 *             properties:
 *               clientId:
 *                 type: string
 *                 format: uuid
 *               workerId:
 *                 type: string
 *                 format: uuid
 *               serviceRequestId:
 *                 type: string
 *                 format: uuid
 *               score:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *                 maxLength: 300
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno no servidor
 */
ratingRoutes.post("/ratings", (request: Request, response: Response) => {
  ratingController.create(request, response);
});

/**
 * @swagger
 * /ratings/worker/{workerId}:
 *   get:
 *     summary: Listar avaliações de um trabalhador
 *     tags: [Avaliações]
 *     parameters:
 *       - in: path
 *         name: workerId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do trabalhador
 *     responses:
 *       200:
 *         description: Lista de avaliações
 *       404:
 *         description: Trabalhador não possui avaliações
 *       500:
 *         description: Erro interno
 */
ratingRoutes.get("/ratings/worker/:workerId", (request: Request, response: Response) => {
  ratingController.getByWorker(request, response);
});

export { ratingRoutes };
