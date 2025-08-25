import winston from 'winston';

export const logger = winston.createLogger({
   level: 'debug', // <- 'info' para escrever todas as informações, warnings e erros
  exitOnError: false, // <- para não encerrar o processo em caso de erro
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/app.log',
      level: 'debug', // <- para garantir que o transport também aceita todos os níveis
    }),
  ],
});


//Logs com Winston estão OK. Mas seria bom integrar com Prometheus/Grafana ou Datadog se for produção.
//