import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import cookieParser from 'cookie-parser';

import { __dirname } from "@/adapter/multer/multer";
import { swaggerSpec } from '@/config/swagger';
import { errorHandler } from "@/shared/errors/errorHeandler";
import { env } from '@/config/env';

//Rotas
import { workerRoutes } from '@/interfaces/routes/worker.routes';
import { clientRoutes } from "@/interfaces/routes/client.routes";
import { serviceRoutes } from "@/interfaces/routes/service.routes";
import { ratingRoutes } from "@/interfaces/routes/rating.routes";
import { favoriteRoutes } from "@/interfaces/routes/favorite.routes";
import { uploadClientPhotoRoute } from "@/interfaces/routes/uploadClientPhoto.routes";
import { uploadWorkerPhotoRoute } from "@/interfaces/routes/uploadeWorkerPhoto.routes";
import { messageRoutes } from "@/interfaces/routes/message.routes";

export const app = express();

// Ativa o CORS para todas as origens
app.use(cors());

app.use(cors({
    origin: env.API_ORIGINS,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
 }));

app.use('/uploads/avatars', express.static(path.resolve(__dirname, '..', 'uploads', 'avatars')));
app.use(express.json());
app.use(cookieParser())
app.use('/api/v1', workerRoutes);
app.use('/api/v1', clientRoutes);
app.use('/api/v1', serviceRoutes);
app.use('/api/v1', ratingRoutes);
app.use('/api/v1', favoriteRoutes)
app.use('/api/v1', uploadClientPhotoRoute)
app.use('/api/v1', uploadWorkerPhotoRoute)
app.use('/api/v1', messageRoutes);

// Swagger disponível em /docs
app.use(env.API_PUBLIC_URL, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);