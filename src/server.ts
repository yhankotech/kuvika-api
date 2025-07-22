import { app } from "@/main";
import { createServer } from 'http';
import { Server } from 'socket.io';
import { logger } from "@/shared/logs/winston";
import { env } from "@/config/env";

export const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE']
  }
});

io.on('connection', socket => {
  logger.info('Usuário conectado', socket.id);

  socket.on('send_message', (message) => {
    // envia para o destinatário
    io.emit(`receive_message_${message.recipientId}`, message);
  });
});

server.listen(env.PORT,  '0.0.0.0', () => {
  logger.info('Servidor rodando na porta:', env.PORT);
});