import { prisma } from '../database/prisma';
import { UserRepository } from '../../domain/repositories/uploadRepository';

export class PrismaWorkerRepository implements UserRepository {
  private connect = prisma;

  async updateAvatar(userId: string, filename: string) {
    return await this.connect.worker.update({
      where: { id: userId },
      data: { avatar: filename },
    });
  }

  async findById(id: string) {
    return await this.connect.worker.findUnique({ where: { id } });
  }

  async removeAvatar(id: string) {
    return await this.connect.worker.update({
      where: { id },
      data: { avatar: null },
    });
  }
}