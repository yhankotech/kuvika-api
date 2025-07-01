// src/http/routes/workerRoutes.ts
import { Router, Request, Response, NextFunction } from 'express';
import { WorkerController } from '../controllers/workerController';

const workerRoutes = Router();
const worker = new WorkerController();

// Passa como callback anônimo para manter tipagem correta
workerRoutes.post('/workers', (req: Request, res: Response) => {
  worker.create(req, res,);
});

export { workerRoutes };