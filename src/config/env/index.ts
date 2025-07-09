import 'dotenv/config';
import { z } from 'zod';
import { BadError } from '../../shared/errors/error';

const schemaEnv = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(4000),
    DATABASE_URL: z.string(),
    DATABASE_CLIENT: z.enum(["mysql", "pg", "sqlite"]).default("pg"),
    JWT_SECRET: z.string(),
    EMAIL_PASSWORD: z.string(),
    EMAIL_PORT: z.coerce.number(),
    EMAIL_NAME: z.string(),
    EMAIL_USER: z.string(),
    EMAIL_HOST: z.string()
})

const _env = schemaEnv.safeParse(process.env)

if (_env.success == false){
    console.error('Variáveis de ambiente inválida❌', _env.error.format())

    throw new BadError('Variáveis de ambiente inválida❌')
}

export const env = _env.data