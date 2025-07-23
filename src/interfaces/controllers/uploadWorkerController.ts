import { Request, Response } from 'express';
import { makeWorkerService } from "@/interfaces/factory/uplaodFactories";
import { AppError } from '@/shared/errors/error';
import z from "zod"

const idSchema = z.object({
  id: z.string().uuid()
});

export class UploadWorkerController {
  async uploadAvatar(request: Request, response: Response) {
    const { id } = idSchema.parse(request.params);

    const filename = request.file?.filename;

    if (!id || !filename) return response.status(400).json({ error: 'Dados inválidos' });

    const service = makeWorkerService()

    const user = await service.upload(id, filename);
    
    return response.status(200).json({ message: 'Foto de perfil atualizada com sucesso!', user });
  }

  async getAvatar(request: Request, response: Response) {
   try {
     const { filename } = request.params;

      const service = makeWorkerService()

      const filePath = await service .get(filename);

      if (!filePath) return response.status(404).json({ error: 'Imagem não encontrada' });

      return response.status(200).sendFile(filePath);

   } catch (error) {

    return response.status(400).json({ error: "Alguma coisa deu errado na nossa parte!" });
    }
  }

 async deleteAvatar(request: Request, response: Response) {
    try {
      const { id } = idSchema.parse(request.params);

      const service = makeWorkerService()

      await service.delete(id);

      return response.json({ message: 'Foto excluída com sucesso' });
    } catch (error) {

      if(error instanceof AppError){
        return response.status(404).json({message:" Cliente não encontrado"});
      }

      if(error instanceof AppError){
        return response.status(400).json({ error: "Alguma coisa deu errado na nossa parte!" });
      }
    }
  }
}