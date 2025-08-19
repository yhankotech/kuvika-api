import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '@/config/env';

interface Payload {
  id: string;
  role: 'client' | 'worker';
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Token ausente' });
    return;
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as Payload;

    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next(); // tudo certo, segue
  } catch {
    res.status(401).json({ message: 'Token inválido' });
  }
}