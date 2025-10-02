import '../config/observability/sentry/instrument';
import * as Sentry from "@sentry/node";
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import { router } from "@/http/routes/index"
import { swaggerSpec } from '@/config/swagger';
import { errorHandler } from "@/shared/errors/errorHeandler";
import { env } from '@/config/env';

export const app = express();

// Lista de origens permitidas
// Lê e separa as origens permitidas
const allowedOrigins = env.API_ORIGINS?.split(',') || [];

// Configuração CORS
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Permite requisições sem origem (como do Postman) ou de origens válidas
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
      callback(null, true);
    } else {
      console.log(`CORS bloqueado para origem: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Ativa o CORS para todas as origens
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser())
app.use(router);
// Swagger disponível em /docs
app.use(env.API_PUBLIC_URL, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

Sentry.setupExpressErrorHandler(app);

app.use(errorHandler);