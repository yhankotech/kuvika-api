import { FavoriteRepository } from "@/domain/repositories/favoriteRepository";
import { FavoriteDTO } from "@/interfaces/dtos/favoriteDto";
import { prisma } from '@/infra/database/prisma';
import { Favorite } from "@/domain/entities/favorite";

export class PrismaFavoriteRepository implements FavoriteRepository {
    private connect = prisma;

  async create(data: FavoriteDTO): Promise<Favorite> {
    return await this.connect.favorite.create({ data });
  }

  async findByClientId(clientId: string): Promise<Favorite[] | null> {
    const client =  await this.connect.favorite.findMany({
      where: { clientId },
      include: {
        worker: {
          select: {
            id: true,
            fullName: true,
            serviceTypes: true,
            location: true,
            avatar: true
          },
        },
      },
    });

    if(!client) return null

    return client 
  }

  async delete(clientId: string, workerId: string): Promise<void> {
    await this.connect.favorite.delete({
      where: {
        clientId_workerId: {
          clientId,
          workerId,
        },
      },
    });
  }
}