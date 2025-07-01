// src/config/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Kuvika API',
      version: '1.0.0',
      description: 'Documentação da API da plataforma Kuvika',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['./src/interfaces/routes/*.ts'], // Caminho onde estão suas rotas
});