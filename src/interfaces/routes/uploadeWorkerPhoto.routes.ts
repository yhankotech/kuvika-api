import { Router, Request, Response} from 'express';
import { upload } from '@/adapter/multer/multer';
import { UploadWorkerController } from '@/interfaces/controllers/uploadWorkerController';
import { ensureAuthenticated } from '@/shared/middleware/authenticate';

const uploadWorkerPhotoRoute = Router();
const workkerAvatarController = new UploadWorkerController()


/**
 * @swagger
 * /api/v1/workers/avatar/{id}:
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
uploadWorkerPhotoRoute.post('/avatar', upload.single('avatar'), ensureAuthenticated,(request: Request, response: Response) => {
  workkerAvatarController.uploadAvatar(request, response);
});


/**
 * @swagger
 * /api/v1/worker/avatar/{id}:
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

uploadWorkerPhotoRoute.delete('/avatar/:id', ensureAuthenticated,(request: Request, response: Response) => {
  workkerAvatarController.deleteAvatar(request, response);
});

/**
 * @swagger
 * /api/v1/workers/avatar/{id}:
 *   put:
 *     summary: Atualizar a foto de perfil do trabalhador
 *     tags: [Avatar]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do trabalhador
 *         schema:
 *           type: string
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
 *     responses:
 *       200:
 *         description: Foto de perfil atualizada com sucesso
 *       400:
 *         description: Dados inválidos ou ausentes
 *       404:
 *         description: Trabalhador não encontrado
 */
uploadWorkerPhotoRoute.put(
  '/avatar/:id',
  upload.single('avatar'),
  ensureAuthenticated,
  (request: Request, response: Response) => {
    workkerAvatarController.updateAvatar(request, response);
  }
);


export { uploadWorkerPhotoRoute };