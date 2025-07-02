import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env'; // onde está a JWT_SECRET

interface Payload {
  sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: 'Token ausente' });

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = jwt.verify(token, env.JWT_SECRET) as Payload;

    req.userId = sub; // ⛔ isso vai dar erro de tipo se você não estender o tipo `Request`

    return next();
  } catch {
    return res.status(401).json({ message: 'Token inválido' });
  }
}
