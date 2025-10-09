import { Request, Response } from 'express';
import { makeService } from '@/http/factory/favoriteFactory';
import { AppError } from '@/shared/errors/error';
import { z } from 'zod';

const createFavoriteSchema = z.object({
  clientId: z.string().uuid(),
  workerId: z.string().uuid(),
});

const idFavoriteSchema = z.object({
  clientId: z.string().uuid(),
});


export class FavoriteController {
    async create(request: Request, response: Response) {
        try {
            const { clientId, workerId } = createFavoriteSchema.parse(request.body);

            const service = makeService()
        
            await service.create({clientId, workerId});

            return response.status(201).json({ message: 'Trabalhador adicionado aos favoritos com sucesso' });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return response.status(400).json({ error: 'Erro de validação', details: error.errors });
            }
            
            if(error instanceof AppError){
                return response.status(400).json({ error: "Alguma coisa deu errado na nossa parte!" });
            }
        }
    }

    async getFavorite(request: Request, response: Response) {
        try {
            const { clientId } = idFavoriteSchema.parse(request.params);

            const service = makeService()

            const favorites = await service.getFavorite(clientId);

            return response.status(200).json(favorites);

        } catch (error) {
            if(error instanceof AppError){
                return response.status(404).json({message:" Cliente não encontrado"});
            }

            if(error instanceof AppError){
                return response.status(400).json({ error: "Alguma coisa deu errado na nossa parte!" });
            }
        }
    }

    async removeFromFavorite(request: Request, response: Response) {
        try {    
            const { clientId, workerId } = createFavoriteSchema.parse(request.body);

            const service = makeService()
        
            await service.deletFavorite(clientId, workerId);

            return response.status(200).json({ message: 'Favorito deletado com sucesso' });

        } catch (error){
            if(error instanceof AppError){
                return response.status(404).json({message:"Favorito não encontrado"});
            }

            if(error instanceof AppError){
                return response.status(400).json({ error: "Alguma coisa deu errado na nossa parte!" });
            }
        }
    }

}

