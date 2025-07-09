import { Request, Response } from 'express';
import { makeWorkerService } from "../factory/uplaodFactories";
import { BadError, ResourceNotFoundError } from '../../shared/errors/error';
import z from "zod"

const idSchema = z.object({
  id: z.string().uuid()
});

export class UploadWorkerController {
  async uploadAvatar(req: Request, res: Response) {
    const { id } = idSchema.parse(req.body);

    const filename = req.file?.filename;

    if (!id || !filename) return res.status(400).json({ error: 'Dados inválidos' });

    const service = makeWorkerService()

    const user = await service.upload(id, filename);
    return res.status(200).json({ message: 'Foto de perfil atualizada com sucesso!', user });
  }

  async getAvatar(req: Request, res: Response) {
   try {
     const { filename } = req.params;

      const service = makeWorkerService()

      const filePath = await service .get(filename);

      if (!filePath) return res.status(404).json({ error: 'Imagem não encontrada' });

      return res.status(200).sendFile(filePath);

   } catch (error) {

    return res.status(400).json({ error: "Alguma coisa deu errado na nossa parte!" });
    }
  }

 async deleteAvatar(req: Request, res: Response) {
    try {
      const { id } = idSchema.parse(req.params);

      const service = makeWorkerService()

      await service.delete(id);

      return res.json({ message: 'Foto excluída com sucesso' });
    } catch (error) {

        if(error instanceof ResourceNotFoundError){
          return res.status(404).json({message:" Cliente não encontrado"});
        }

        if(error instanceof BadError){
          return res.status(400).json({ error: "Alguma coisa deu errado na nossa parte!" });
        }
    }
  }
}