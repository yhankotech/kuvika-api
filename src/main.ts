import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import { router } from "@/interfaces/routes/index"
import { swaggerSpec } from '@/config/swagger';
import { errorHandler } from "@/shared/errors/errorHeandler";
import { env } from '@/config/env';

export const app = express();

// Ativa o CORS para todas as origens
app.use(cors());

app.use(cors({
    origin: env.API_ORIGINS,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    allowedHeaders:['Content-Type', 'Authorization', 'Origin']
}));

app.use(express.json());
app.use(cookieParser())
app.use(router);
// Swagger disponível em /docs
app.use(env.API_PUBLIC_URL, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);