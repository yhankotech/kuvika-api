import { Client } from "@/domain/entities/client";

export interface UploadClientRepository {
  updateAvatar(userId: string, filename: string | undefined): Promise<Client | null>;
  findById(id: string): Promise<Client | null>;
  removeAvatar(id: string): Promise<Client | null>;
}