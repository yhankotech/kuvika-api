import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from './config/swagger';
import cookieParser from 'cookie-parser'

//Rotas
import { workerRoutes } from './interfaces/routes/worker.routes';
import { clientRoutes } from "./interfaces/routes/client.routes";
import { serviceRoutes } from "./interfaces/routes/service.routes";
import { ratingRoutes } from "./interfaces/routes/rating.routes";
import { favoriteRoutes } from "./interfaces/routes/favorite.routes";

export const app = express();

// Ativa o CORS para todas as origens
app.use(cors());

// Ou com configuração personalizada
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
// }));
app.use(express.json());
app.use(cookieParser())
app.use('/api/v1', workerRoutes);
app.use('/api/v1', clientRoutes);
app.use('/api/v1', serviceRoutes);
app.use('/api/v1', ratingRoutes);
app.use('api/v1/', favoriteRoutes )

// Swagger disponível em /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));