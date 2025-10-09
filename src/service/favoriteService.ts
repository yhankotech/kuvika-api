import { FavoriteRepository} from "@/domain/repositories/favoriteRepository";
import { ClientRepository } from "@/domain/repositories/clientRepository";
import { WorkerRepository } from "@/domain/repositories/workRepository";
import { Favorite } from "@/domain/entities/favorite";
import { AppError } from "@/shared/errors/error";
import { FavoriteDTO } from "@/http/dtos/favoriteDto";

export class FavoriteService {
  constructor(
      private readonly favRepository: FavoriteRepository,
      private readonly clientRepository: ClientRepository,
      private readonly workerRepository: WorkerRepository,
    ) {}

  async create(data: FavoriteDTO): Promise<Favorite> {
    return this.favRepository.create({
      ...data,
    });
  }

  async getFavorite(clientId: string): Promise<Favorite[] | null> {
    const favorite = await this.favRepository.findByClientId(clientId);

    if (!favorite) {
      throw new AppError("Nenhum favorito encontrado!");
    }
    return favorite;
  }

  async deletFavorite(clientId: string, workerId: string) {
    const worker = await this.workerRepository.getById(workerId);

    if (!worker) {
      throw new AppError("Trabalhador não encontrado !", 404);
    }

    const client = await this.clientRepository.getById(clientId);

    if (!client) {
      throw new AppError("Cliente não encontrado !", 404);;
    }
    
    const favorite = await this.favRepository.delete(clientId, workerId);

    return favorite
  }

}