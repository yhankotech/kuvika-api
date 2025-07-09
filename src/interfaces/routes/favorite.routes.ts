import { Router, Request, Response } from 'express';
import { FavoriteController } from '../controllers/favoriteController';

const favoriteRoutes = Router()
const favoriteController = new FavoriteController()


/**
 * @swagger
 * tags:
 *   name: Favoritos
 *   description: Gerenciamento de favoritos de trabalhadores
 */

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Adicionar um trabalhador aos favoritos
 *     tags: [Favoritos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 format: uuid
 *               workerId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Trabalhador favoritado com sucesso
 */
favoriteRoutes.post('/favorites',  (request: Request, response: Response) => {
  favoriteController.create(request, response);
});

 /* /favorites/{clientId}:
 *   get:
 *     summary: Listar trabalhadores favoritos de um cliente
 *     tags: [Favoritos]
 *     parameters:
 *       - name: clientId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Lista de favoritos
*/
favoriteRoutes.get('/favorites/:clientId',  (request: Request, response: Response) => {
  favoriteController.getFavorite(request, response);
});

 /* /favorites:
 *   delete:
 *     summary: Remover trabalhador dos favoritos
 *     tags: [Favoritos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 format: uuid
 *               workerId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       204:
 *         description: Removido com sucesso
 */
favoriteRoutes.delete('/favorites',  (request: Request, response: Response) => {
  favoriteController.removeFromFavorite(request, response);
});



export { favoriteRoutes };
