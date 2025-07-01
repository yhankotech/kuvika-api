import { app } from "./main";
import { env } from "./config/env";

app.listen(env.PORT,  '0.0.0.0', () => {
  console.log('Servidor rodando na porta:', env.PORT);
});
