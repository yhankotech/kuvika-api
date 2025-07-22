import { FavoriteDTO } from "@/interfaces/dtos/favoriteDto";
import { Favorite } from "@/domain/entities/favorite";

export interface FavoriteRepository {
  create(data: FavoriteDTO): Promise<Favorite>;
  findByClientId(clientId: string): Promise<Favorite[] | null>;
  delete(clientId: string, workerId: string): Promise<void>;
}