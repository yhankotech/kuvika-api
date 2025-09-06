import { Request, Response } from 'express';
import { z } from 'zod';
import {
  makeWorker
} from '@/http/factory/workerFactory';
import { AppError } from '@/shared/errors/error';
import { env } from '@/config/env';
import jwt from 'jsonwebtoken';
import { logger } from '@/shared/loggers/winston';

const createWorkerBodySchema = z.object({
  fullName: z.string().min(3, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  phoneNumber: z.string().min(7, 'Número de telefone inválido'),
  serviceTypes: z.array(z.string()).min(1, 'Informe pelo menos um serviço'),
  confirmPassword: z.string().min(6, 'Confirmação de senha deve ter pelo menos 6 caracteres'),
  location: z.string().min(3, 'Localização obrigatória'),
  availability: z.string().min(1, 'Disponibilidade obrigatória'),
  municipality: z.string().optional(),
  neighborhood: z.string().optional(),
  profession: z.string().optional(),
  experience: z.number().int().nonnegative().optional(),
  birth_date: z.coerce.date().optional(),
  gender: z.enum(['Masculino', 'Feminino', 'Outro']).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não conferem',
  path: ['confirmPassword'],
});

const updateWorkerBodySchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email('Email inválido').optional(),
  phoneNumber: z.string().optional(),
  serviceTypes: z.array(z.string()).optional(),
  location: z.string().optional(),
  availability: z.string().optional(),
  avatar: z.string().optional(),
  municipality: z.string().optional(),
  neighborhood: z.string().optional(),
  profession: z.string().optional(),
  experience: z.number().int().nonnegative().optional(),
  birth_date: z.coerce.date().optional(),
  gender: z.enum(['Masculino', 'Feminino', 'Outro']).optional(),
});

const idSchema = z.object(
  {
    id: z.string().uuid()
  }
)

const searchWorkerSchema = z.object({
  location: z.string(),
  serviceType: z.string(),
  minRating: z.number().int(),
});

export class WorkerController {
  async login(request: Request, response: Response) {
    try {
      const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
      });

      const data = loginSchema.parse(request.body);

      const service = makeWorker();
      const result = await service.execute(data);

      return response.status(202).json(result);
    } catch (error) {

      if (error instanceof z.ZodError) {
        return response.status(400).json({ error: 'Erro de validação', details: error.errors });
      }

      throw new AppError("Alguma coisa deu errado na nossa parte!", 400)
    }
  }

   async logout(request: Request, response: Response): Promise<Response> {
      const token = request.cookies.token
  
       if (token) {
        try {
          const payload = jwt.verify(token, env.JWT_SECRET!) as { sub: string, role: string }
  
          // Aqui você poderia passar o ID do usuário para o serviço
          const logoutService = makeWorker();
          await logoutService.getById(payload.sub)
  
        } catch (err) {
          if(err instanceof AppError){
            response.status(400).json({message: 'Não foi possível fazer logout'})
          }
        }
      }
  
      // Limpar o cookie
      response.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })
  
      return response.status(200).json({ message: 'Logout realizado com sucesso.' })
    }

  async create(request: Request, response: Response) {
    try {
      const body = createWorkerBodySchema.parse(request.body);

      const service = makeWorker();
      const worker = await service.create(body);

      return response.status(201).json(worker);
    } catch (error) {

      if (error instanceof z.ZodError) {
        return response.status(400).json({
          error: 'Erro de validação',
          details: error.errors
        });
      }
      
      if(error instanceof AppError){
        return response.status(409).json({ error: "E-mail já cadastrado!" });
      }

      return response.status(400).json({ error: "Alguma coisa aconteceu na nossa parte!" });

    }
  }

  async getAll(_: Request, response: Response) {
    try {
      const service = makeWorker();
      const workers = await service.getAll();

      return response.status(200).json(workers);
    } catch (error) {
      return response.status(400).json({ error: "Alguma coisa aconteceu na nossa parte!" });
    }
  }

  async getById(request: Request, response: Response) {
    try {
      const { id } = idSchema.parse(request.params);

      const service = makeWorker();
      const worker = await service.getById(id);

      return response.status(200).json(worker);

    } catch (error) {
      if(error instanceof AppError){
        return response.status(404).json({message:" Cliente não encontrado"});
      }

      return response.status(400).json({ error: "Alguma coisa aconteceu na nossa parte!" });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const body = updateWorkerBodySchema.parse(request.body);

      const service = makeWorker();
      const updated = await service.update({ id: request.user.id, dto: body });

      return response.status(200).json({ message: 'Trabalhador atualizado com sucesso', updated });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return response.status(400).json({
          error: 'Erro de validação',
          details: error.errors
        });
      }

      return response.status(400).json({ error: "Alguma coisa aconteceu na nossa parte!" });
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = idSchema.parse(request.params);

      const service = makeWorker();
      await service.delete(id);

      return response.status(204).json({ message: 'Trabalhador deletado com sucesso' });
    } catch (error) {
        if(error instanceof AppError){
          return response.status(404).json({message:" Cliente não encontrado"});
        }

        if(error instanceof AppError){
          return response.status(400).json({message: "Alguma coisa deu errado na nossa parte!"});
        }
    }
  }

  async profile(request: Request, response: Response): Promise<Response> {
    try {
      
      const service = makeWorker();

      const profile = await service.getProfile(request.user.id);
          
      return response.json( profile );

    } catch (err) {

      return response.status(404).json({ message: "Perfil não encontrado!" });
    }
  }
  
    async search(request: Request, response: Response) {
      try {
        const { location, minRating, serviceType } = searchWorkerSchema.parse(request.body)
        
        const service = makeWorker();

        const result = await service.search(
          location, 
          serviceType,
          minRating,
        );

        return response.status(200).json(result);
      } catch (error) {
        if(error instanceof AppError){
            return response.status(404).json({message:" Trabalhador não encontrado"});
        }

        if(error instanceof AppError){
          return response.status(400).json({message: "Alguma coisa deu errado na nossa parte!"});
        }
      }
    }
  async activate(req: Request, res: Response) {
    try {
      const activateSchema = z.object({
        email: z.string().email(),
        code: z.string().length(6)
      });
  
      const validated = activateSchema.parse(req.body);
      const service = makeWorker();
  
      await service.activate(validated);
      return res.json({ message: "Conta ativada com sucesso!" });
    } catch (err: any) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  }

  async updatePassword(req: Request, res: Response) {
    const updatePasswordSchema = z.object({
      email: z.string().email("E-mail inválido"),
      currentPassword: z.string().min(6, "A senha atual deve ter no mínimo 6 caracteres"),
      newPassword: z.string().min(6, "A nova senha deve ter no mínimo 6 caracteres"),
      confirmPassword: z.string().min(6, "A confirmação deve ter no mínimo 6 caracteres"),
    }).refine((data) => data.newPassword === data.confirmPassword, {
      message: "A nova senha e a confirmação devem ser iguais",
      path: ["confirmPassword"],
    });
    try {
      const { email, currentPassword, newPassword } = updatePasswordSchema.parse(req.body);

      const service = makeWorker();

      await service.updatePassword({ email, currentPassword, newPassword, user_id: req.user.id });

      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: "Alguma coisa deu errado na nossa parte!" });
    }
  }
}