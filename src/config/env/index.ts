import 'dotenv/config'
import { z } from 'zod'

const schemaEnv = z.object({
  PORT: z.coerce.number().default(3000),
})

const _env = schemaEnv.safeParse(process.env)

if (_env.success == false) {
  console.error('Variáveis de ambiente inválida❌', _env.error.format())

  throw new Error('Variáveis de ambiente inválida❌')
}

export const env = _env.data