import { Router, Request, Response} from 'express';
import { upload } from '../../adapter/multer/multer';
import { UploadWorkerController } from '../controllers/uploadWorkerController';

const uploadWorkerPhotoRoute = Router();
const workkerAvatarController = new UploadWorkerController()

/**
 * @swagger
 * tags:
 *   name: Avatar
 *   description: Gerenciamento de avatar do trabalhador
 */

/**
 * @swagger
 * /worker/avatar:
 *   post:
 *     summary: Fazer upload da foto de perfil do trabalhador
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
uploadWorkerPhotoRoute.post('/worker/avatar', upload.single('avatar'), (request: Request, response: Response) => {
  workkerAvatarController.uploadAvatar(request, response);
});

/**
 * @swagger
 * /worker/avatar/{filename}:
 *   get:
 *     summary: Obter imagem do avatar do trabalhador
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

uploadWorkerPhotoRoute.get('/worker/avatar/:filename', (request: Request, response: Response) => {
  workkerAvatarController.getAvatar(request, response);
});

/**
 * @swagger
 * /worker/avatar/{id}:
 *   delete:
 *     summary: Excluir avatar do trabalhador
 *     tags: [Avatar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do trabalhador
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

uploadWorkerPhotoRoute.delete('/worker/avatar/:id', (request: Request, response: Response) => {
  workkerAvatarController.deleteAvatar(request, response);
});

export { uploadWorkerPhotoRoute };
