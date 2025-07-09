import { FavoriteRepository} from "../../domain/repositories/favoriteRepository";
import { ClientRepository } from "../../domain/repositories/clientRepository";
import { WorkerRepository } from "../../domain/repositories/workRepository";
import { Favorite } from "../../domain/entities/favorite";
import { ResourceNotFoundError } from "../../shared/errors/error";
import { FavoriteDTO } from "../../interfaces/dtos/favoriteDto";

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
      throw new ResourceNotFoundError();
    }
    return favorite;
  }

  async deletFavorite(clientId: string, workerId: string) {
    const worker = await this.workerRepository.getById(workerId);

    if (!worker) {
      throw new ResourceNotFoundError();
    }

    const client = await this.clientRepository.getById(clientId);

    if (!client) {
      throw new ResourceNotFoundError();
    }
    
    const favorite = await this.favRepository.delete(clientId, workerId);

    return favorite
  }

}