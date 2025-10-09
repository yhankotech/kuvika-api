import { createServer } from "http";
import { Server, Socket } from "socket.io";
import {app} from "@/bootstrap/main";
import { logger } from "@/shared/loggers/winston";
import { env } from "@/config/env";

export class SocketServer {
  private io: Server;
  private httpServer;

  constructor() {
    this.httpServer = createServer(app);

    this.io = new Server(this.httpServer, {
      cors: {
        origin: env.API_ORIGINS, 
        methods: ["GET", "POST", "DELETE", "PUT"],
      },
    });
   
  }

  public listen() {
        this.setupListeners();

        this.httpServer.listen(env.PORT, () => {
            logger.info(`Servidor WebSocket rodando na porta: ${env.PORT}`);
        });
    }

  private setupListeners() {
    this.io.on("connection", (socket: Socket) => {
      logger.info(`🔌 Usuário conectado: ${socket.id}`);

      // Usuário entra na sua "sala" (userId = ID do usuário logado)
      socket.on("join", (userId: string) => {
        socket.join(userId);
        logger.info(`👤 Usuário ${userId} entrou na sala`);
      });

      // Usuário envia mensagem para outro
      socket.on("send_message", (data: { senderId: string; recipientId: string; text: string }) => {
        logger.info(`📩 Mensagem de ${data.senderId} para ${data.recipientId}: ${data.text}`);

        // envia apenas para o destinatário
        this.io.to(data.recipientId).emit("receive_message", data);
      });

      // Desconexão
      socket.on("disconnect", () => {
        logger.error(`❌ Usuário desconectado: ${socket.id}`);
      });
    });
  }
}

// Inicializa automaticamente
new SocketServer();