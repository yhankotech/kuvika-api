import { prisma } from '@/infra/database/prisma';
import { UploadWorkerRepository } from '@/domain/repositories/uploadWorkRepository';

export class PrismaWorkerRepository implements UploadWorkerRepository {
  private connect = prisma;

  async updateAvatar(userId: string, filename: string) {
    const avatar = await this.connect.worker.update({
      where: { id: userId },
      data: { avatar: filename },
    });

    if (!avatar) return null;

    return {
      ...avatar,
      avatar: avatar.avatar ?? undefined,
    };
  }

  async findById(id: string) {
    const avatar = await this.connect.worker.findUnique({ where: { id } });
    if (!avatar) return null;

    return {
      ...avatar,
      avatar: avatar.avatar ?? undefined,
    };
  }

  async removeAvatar(id: string) {
    const avatar = await this.connect.worker.update({
      where: { id },
      data: { avatar: null },
    });
    if (!avatar) return null;

    return {
      ...avatar,
      avatar: avatar.avatar ?? undefined,
    };
  }
}