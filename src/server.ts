import { app } from "@/main";
import { env } from "@/config/env";
import { logger } from "@/shared/logs/winston";

app.listen(env.PORT,  '0.0.0.0', () => {
  logger.info('Servidor rodando na porta:', env.PORT);
});