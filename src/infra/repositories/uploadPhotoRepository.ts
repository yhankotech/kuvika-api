import { prisma } from '@/infra/database/prisma';
import { UserRepository } from '@/domain/repositories/uploadRepository';

export class PrismaClientRepository implements UserRepository {
  private connect = prisma;

  async updateAvatar(userId: string, filename: string) {
    return await this.connect.client.update({
      where: { id: userId },
      data: { avatar: filename },
    });
  }

  async findById(id: string) {
    return await this.connect.client.findUnique({ where: { id } });
  }

  async removeAvatar(id: string) {
    return await this.connect.client.update({
      where: { id },
      data: { avatar: null },
    });
  }
}
