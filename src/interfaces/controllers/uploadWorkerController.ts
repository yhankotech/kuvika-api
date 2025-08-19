import { Request, Response } from 'express';
import { makeWorkerService } from "@/interfaces/factory/uplaodFactories";
import { AppError } from '@/shared/errors/error';
import CloudinaryService from "@/service/cloudinaryService";
import { generateHash } from "@/utils/generateHash";
import sharp from "sharp"
import z from "zod"

const idSchema = z.object({
  userId: z.string().uuid()
});

export class UploadWorkerController {
  async uploadAvatar(request: Request, response: Response) {
    const { userId } = idSchema.parse(request.body);

    let avatarUrl: string | undefined;
    
    if (request.file){
      const convertBuffer = await sharp(request.file.buffer).jpeg({quality: 80}).toBuffer();
    
      if(convertBuffer.length > 1024 * 1024 * 2){
        return response.status(400).json({ error: 'Arquivo muito grande. O tamanho máximo permitido é 2MB.' });
      }
    
      const fileName = `user-${generateHash(8)}`;
      avatarUrl = (await CloudinaryService.upload(
        convertBuffer, 
        fileName,
        "workers"
      )) as string;
    
      if (!avatarUrl) {
        return response.status(400).json({ error: 'Imagem é necessária' });
      }
    }
    

    const service = makeWorkerService()

    const user = await service.upload({userId, filename: avatarUrl });
    
    return response.status(200).json({ message: 'Foto de perfil atualizada com sucesso!', user });
  }

 async deleteAvatar(request: Request, response: Response) {
    try {
       const { userId } = idSchema.parse(request.params);

        const service = makeWorkerService()

        const existing = await service.getById(userId);
      
        if (!existing) {
          return response.status(404).json({ error: 'Cliente não encontrado' });
      }
      
      if(existing.avatar) {
        const parts = existing.avatar.split('/');
        const fileNameWithExt = parts[parts.length - 1];
        const folder = parts[parts.length - 2];
        const publicId = `${folder}/${fileNameWithExt.split('.')[0]}`;
              
        await CloudinaryService.destroy(publicId);
      }

      await service.delete(userId);

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