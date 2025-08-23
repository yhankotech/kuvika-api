import { Router, Request, Response } from "express";
import { ServiceRequestController } from "@/http/controllers/serviceController";
import { ensureAuthenticated } from "@/shared/middleware/authenticate";

const serviceRoutes = Router();
const serviceController = new ServiceRequestController();

/**
 * @swagger
 * tags:
 *   name: ServiceRequest
 *   description: Gerenciamento de solicitações de serviços
 */

/**
 * @swagger
 * /api/v1/service/requests:
 *   post:
 *     summary: Criar uma solicitação de serviço
 *     tags:
 *       - ServiceRequest
 *     parameters:
 *       - in: query
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do cliente que está solicitando o serviço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               workerId:
 *                 type: string
 *                 format: uuid
 *               serviceDate:
 *                 type: string
 *                 format: date-time
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *             required:
 *               - workerId
 *               - serviceDate
 *               - description
 *               - status
 *     responses:
 *       '201':
 *         description: Solicitação de serviço criada com sucesso
 *       '400':
 *         description: Erro de validação ou erro na criação
 */
serviceRoutes.post("/requests/:clientId", ensureAuthenticated, (request: Request, response: Response) => {
  serviceController.create(request, response);
});

/**
 * @swagger
 * /api/v1/service/requests/client/{clientId}:
 *   get:
 *     summary: Buscar solicitações de serviço por cliente
 *     tags:
 *       - ServiceRequest
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do cliente
 *     responses:
 *       '200':
 *         description: Lista de solicitações de serviço encontradas
 *       '404':
 *         description: Cliente não encontrado
 */
serviceRoutes.get("/requests/client/:clientId", ensureAuthenticated,(request: Request, response: Response) => {
  serviceController.getByClient(request, response);
});

/**
 * @swagger
 * /api/v1/service/requests/worker/{workerId}:
 *   get:
 *     summary: Buscar solicitações de serviço por trabalhador
 *     tags:
 *       - ServiceRequest
 *     parameters:
 *       - in: path
 *         name: workerId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do trabalhador
 *     responses:
 *       '200':
 *         description: Lista de solicitações de serviço encontradas
 *       '404':
 *         description: Trabalhador não encontrado
 */
serviceRoutes.get("/requests/worker/:workerId", ensureAuthenticated, (request: Request, response: Response) => {
  serviceController.getByWorker(request, response);
});

/**
 * @swagger
 * /api/v1/service/request/{id}/status:
 *   patch:
 *     summary: Atualizar status de uma solicitação de serviço
 *     tags:
 *       - ServiceRequest
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da solicitação de serviço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *             required:
 *               - status
 *     responses:
 *       '200':
 *         description: Status atualizado com sucesso
 *       '400':
 *         description: Erro de validação
 *       '404':
 *         description: Solicitação não encontrada
 */
serviceRoutes.patch("/request/:id/status", ensureAuthenticated, (request: Request, response: Response) => {
  serviceController.updateStatus(request, response);
});

/**
 * @swagger
 * /api/v1/service/delete/{id}:
 *   delete:
 *     summary: Apagar solicitações de serviço
 *     tags:
 *       - ServiceRequest
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do serviço
 *     responses:
 *       '200':
 *         description: Serviço apagado
 *       '404':
 *         description: Serviço não encontrado
 */
serviceRoutes.delete("/delete/:id", ensureAuthenticated, (request: Request, response: Response) => {
  serviceController.deleteService(request, response);
});

export { serviceRoutes };
