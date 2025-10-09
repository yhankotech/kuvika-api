import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { env } from "@/config/env/index";

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Kuvika API',
      version: '1.0.0',
      description: 'Documentação da API da plataforma Kuvika',
    },
  },
  apis: ['src/http/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);

export function setupSwagger(app: Express) {
  app.use(env.API_PUBLIC_URL, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}