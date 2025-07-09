import { Request, Response } from 'express';
import { z } from 'zod';
import { makeClientService } from '../factory/clientFactory';
import { BadError, EmailAlreadyExist, InvalidCredentials, ResourceNotFoundError } from '../../shared/errors/error';
import { env } from '../../config/env';
import jwt from 'jsonwebtoken';

const createClientSchema = z.object({
  fullName: z.string().min(3, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  phone: z.string().min(7, 'Número de telefone inválido'),
  location: z.string().min(3, 'Localização obrigatória')
});

const updateClientSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  phone: z.string().optional(),
  location: z.string().optional()
});

const idSchema = z.object({
  id: z.string()
});

const emailSchema = z.object({
  email: z.string().email()
});

export const loginClientSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export type LoginClientDTO = z.infer<typeof loginClientSchema>;


export class ClientController {
  async login(req: Request, res: Response) {
    try {
      const data = loginClientSchema.parse(req.body);

      const service = makeClientService();
      const result = await service.login(data);

      return res.status(202).json(result);

    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: 'Erro de validação', details: error.errors });
      }

      if(error instanceof InvalidCredentials){
         return res.status(401).json({ error: "E-mail ou senha inválida" });;
      }

      if(error instanceof BadError){
        return res.status(400).json({ error: "Alguma coisa deu errado na nossa parte!" });
      }

    }
  }

  async logout(req: Request, res: Response): Promise<Response> {
    const token = req.cookies.token

     if (token) {
      try {
        const payload = jwt.verify(token, env.JWT_SECRET!) as { sub: string, role: string }

        // Aqui você poderia passar o ID do usuário para o serviço
        const logoutService = makeClientService();
        await logoutService.getById({ id: payload.sub })

      } catch (error) {
        return res.status(400).json('Token inválido ao tentar fazer logout.')
      }
    }

    // Limpar o cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })

    return res.status(200).json({ message: 'Logout realizado com sucesso.' })
  }

  async create(request: Request, response: Response) {
    try {
      const data = createClientSchema.parse(request.body);
      const service = makeClientService();

      await service.create(data);

      return response.status(201).json({ message: 'Cliente criado com sucesso' });
    } catch (error) {

      if (error instanceof z.ZodError) {
        return response.status(400).json({ error: 'Erro de validação', details: error.errors });
      }

      if(error instanceof EmailAlreadyExist){
        return response.status(409).json({ error: "E-mail já cadastrado!" });
      }

      if(error instanceof BadError){
        return response.status(400).json({ error: "Alguma coisa deu errado na nossa parte!" });
      }
    }
  }

  async getAll(_: Request, response: Response) {
    try {
      const service = makeClientService();
      const clients = await service.getAll();

      return response.status(200).json(clients);
    } catch (error) {
      
      return response.status(400).json({ error: "Alguma coisa aconteceu na nossa parte!" });
    }
  }

  async getById(request: Request, response: Response) {
    try {
      const { id } = idSchema.parse(request.params);

      const service = makeClientService();

      const client = await service.getById({id});

      return response.status(200).json(client);
    } catch (error) {
      
      if(error instanceof ResourceNotFoundError){
        return response.status(404).json({message:" Cliente não encontrado"});
      }

      if(error instanceof BadError){
        return response.status(400).json({ error: "Alguma coisa deu errado na nossa parte!" });
      }
    }
  }

  async getByEmail(request: Request, response: Response) {
    try {
      const { email } = emailSchema.parse(request.body);

      const service = makeClientService();

      const client = await service.getByEmail({email});

      return response.status(200).json(client);

    } catch (error) {

      if(error instanceof ResourceNotFoundError){
        return response.status(404).json({message:" Cliente não encontrado"});
      }

      if(error instanceof BadError){
        return response.status(400).json({ error: "Alguma coisa deu errado na nossa parte!" });
      }
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { id } = idSchema.parse(request.params);

      const body = updateClientSchema.parse(request.body);

      const service = makeClientService();

      const updated = await service.update(id, body);

      return response.status(202).json({ message: 'Cliente atualizado com sucesso', updated });

    } catch (error) {
      if (error instanceof z.ZodError) {
        return response.status(400).json({ error: 'Erro de validação', details: error.errors });
      }

      if(error instanceof ResourceNotFoundError){
        return response.status(404).json({message:" Cliente não encontrado"});
      }
  
    }
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = idSchema.parse(request.params);

      const service = makeClientService();

      await service.delete({id});

      return response.status(200).json({ message: 'Cliente deletado com sucesso' });

    } catch (error) {
      
      if(error instanceof ResourceNotFoundError){
        return response.status(404).json({message:" Cliente não encontrado"});
      }

      if(error instanceof BadError){
        return response.status(400).json({ error: "Alguma coisa deu errado na nossa parte!" });
      }
      
    }
  }

  async profile(req: Request, res: Response): Promise<Response> {
    try {
          const userId = req.user?.id;
          const role = req.user?.role;
      
          if (!userId || !role) {
             return res.status(401).json({ message: 'Não autenticado' });
          }
        
          const service = makeClientService();
          const profile = await service.getProfile(userId, role);
            
          return res.json({ profile });
  
        } catch (err) {
  
          return res.status(404).json({ message: "Perfil não encontrado!" });
        }
      }
}