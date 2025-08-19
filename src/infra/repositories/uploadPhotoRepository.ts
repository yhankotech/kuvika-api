import { prisma } from '@/infra/database/prisma';
import { UploadClientRepository } from '@/domain/repositories/uploadClientRepository';

export class PrismaClientRepository implements UploadClientRepository {
  private connect = prisma;

  async updateAvatar(userId: string, filename: string | undefined) {
    const avatar = await this.connect.client.update({
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
    const avatar = await this.connect.client.findUnique({ where: { id } });
    if (!avatar) return null;

    return {
      ...avatar,
      avatar: avatar.avatar ?? undefined,
    };
  }

  async removeAvatar(id: string) {
    const avatar = await this.connect.client.update({
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
