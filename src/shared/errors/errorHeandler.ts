import * as Sentry from "@sentry/node";
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { logger } from "@/shared/loggers/winston";
import { env } from '@/config/env';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.info('Aplicação iniciada');
  logger.error(`Erro capturado: ${err.message}`, { stack: err.stack });

  if (err instanceof ZodError) {
    Sentry.captureException(err);
    res.status(400).json({
      message: 'Erro de validação',
      errors: err.issues,
    });
    return;
  }

  if (err.status && err.message) {
    res.status(err.status).json({
      message: err.message,
      ...(err.details && { details: err.details }),
    });
    return;
  }

  res.status(500).json({
    message: 'Erro interno do servidor',
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
    sentryId: (res as any).sentry
  });
};