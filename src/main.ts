// server.js ou server.ts
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from './config/swagger';

//Rotas
import { workerRoutes } from './interfaces/routes/worker.routes';

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
app.use('/api', workerRoutes);

// Swagger disponível em /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));