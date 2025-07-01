// src/http/controllers/WorkerController.ts
import { Request, Response } from 'express';
import { RequestHandler } from 'express';
import { makeCreateWorker } from '../factory/workerFactory';
import { z } from 'zod';

const createWorkerBodySchema = z.object({
  fullName: z.string().min(3, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  phoneNumber: z.string().min(7, 'Número de telefone inválido'),
  serviceTypes: z.array(z.string()).min(1, 'Informe pelo menos um serviço'),
  location: z.string().min(3, 'Localização obrigatória'),
  availability: z.string().min(1, 'Disponibilidade obrigatória')
});

export class WorkerController {
   async create (req:Request, res: Response) {
    try {
      const body = createWorkerBodySchema.parse(req.body); 

      const service = makeCreateWorker();
      await service.execute(body);

      return res.status(201).json({ message: 'Trabalhador criado com sucesso' });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Erro de validação',
          details: error.errors
        });
      }

      return res.status(400).json({ error: error.message });
    }
  }
}