import { Request, Response } from 'express';
import { z } from 'zod';
import {
  makeWorker
} from '../factory/workerFactory';

const createWorkerBodySchema = z.object({
  fullName: z.string().min(3, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  phoneNumber: z.string().min(7, 'Número de telefone inválido'),
  serviceTypes: z.array(z.string()).min(1, 'Informe pelo menos um serviço'),
  location: z.string().min(3, 'Localização obrigatória'),
  availability: z.string().min(1, 'Disponibilidade obrigatória')
});

const updateWorkerBodySchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email('Email inválido').optional(),
  password: z.string().min(6).optional(),
  phoneNumber: z.string().optional(),
  serviceTypes: z.array(z.string()).optional(),
  location: z.string().optional(),
  availability: z.string().optional()
});

const idSchema = z.object(
  {
    id: z.string()
  }
)

export class WorkerController {
  async login(req: Request, res: Response) {
    try {
      const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
      });

      const data = loginSchema.parse(req.body);

      const service = makeWorker();
      const result = await service.execute(data);

      return res.status(202).json(result);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Erro de validação', details: error.errors });
      }

      return res.status(401).json({ error: error.message });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const body = createWorkerBodySchema.parse(request.body);

      const service = makeWorker();
      await service.create(body);

      return response.status(201).json({ message: 'Trabalhador criado com sucesso' });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return response.status(400).json({
          error: 'Erro de validação',
          details: error.errors
        });
      }

      return response.status(400).json({ error: error.message });
    }
  }

  async getAll(request: Request, response: Response) {
    try {
      const service = makeWorker();
      const workers = await service.getAll();

      return response.status(200).json(workers);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }

  async getById(request: Request, response: Response) {
    try {
      const { id } = idSchema.parse(request.params);

      const service = makeWorker();
      const worker = await service.getById(id);

      if (!worker) {
        return response.status(404).json({ error: 'Trabalhador não encontrado' });
      }

      return response.status(200).json(worker);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id } = idSchema.parse(request.params);
      const body = updateWorkerBodySchema.parse(request.body);

      const service = makeWorker();
      const updated = await service.update(id, body);

      if (!updated) {
        return response.status(404).json({ error: 'Trabalhador não encontrado para atualização' });
      }

      return response.status(200).json({ message: 'Trabalhador atualizado com sucesso', updated });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return response.status(400).json({
          error: 'Erro de validação',
          details: error.errors
        });
      }

      return response.status(400).json({ error: error.message });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = idSchema.parse(request.params);

      const service = makeWorker();
      await service.delete(id);

      return response.status(200).json({ message: 'Trabalhador deletado com sucesso' });
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}