// src/config/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Kuvika API',
      version: '1.0.0',
      description: 'Documentação da API da plataforma Kuvika',
    },
  },
   apis: ['src/http/routes/**/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}