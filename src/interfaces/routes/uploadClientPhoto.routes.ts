import { Router, Request, Response} from 'express';
import { upload } from '@/adapter/multer/multer';
import { UploadClientController } from '@/interfaces/controllers/uploadClientController';
import { ensureAuthenticated } from '@/shared/middleware/authenticate';

const uploadClientPhotoRoute = Router();
const clientAvatarController = new UploadClientController()

/**
 * @swagger
 * tags:
 *   name: Avatar
 *   description: Gerenciamento de avatar do cliente
 */

/**
 * @swagger
 * /api/v1/client/avatar:
 *   post:
 *     summary: Fazer upload da foto de perfil do cliente
 *     tags: [Avatar]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *               userId:
 *                 type: string
 *                 example: "1a2b3c4d"
 *     responses:
 *       200:
 *         description: Foto de perfil atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Foto de perfil atualizada com sucesso!
 *                 user:
 *                   type: object
 *       400:
 *         description: Dados inválidos ou ausentes
 */
uploadClientPhotoRoute.post('/client/avatar', upload.single('avatar'), ensureAuthenticated, (request: Request, response: Response) => {
  clientAvatarController.uploadAvatar(request, response);
});

/**
 * @swagger
 * /api/v1/client/avatar/{filename}:
 *   get:
 *     summary: Obter imagem do avatar do cliente
 *     tags: [Avatar]
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         description: Nome do arquivo de imagem
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retorna o arquivo de imagem
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Imagem não encontrada
 */

uploadClientPhotoRoute.get('/client/avatar/:filename', ensureAuthenticated,(request: Request, response: Response) => {
  clientAvatarController.getAvatar(request, response);
});

/**
 * @swagger
 * /api/v1/client/avatar/{id}:
 *   delete:
 *     summary: Excluir avatar do cliente
 *     tags: [Avatar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cliente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Avatar excluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Avatar excluído com sucesso
 *       404:
 *         description: Usuário ou avatar não encontrado
 */

uploadClientPhotoRoute.delete('/client/avatar/:id', ensureAuthenticated,(request: Request, response: Response) => {
  clientAvatarController.deleteAvatar(request, response);
});

export { uploadClientPhotoRoute };
