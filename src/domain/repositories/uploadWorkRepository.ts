import { Worker } from "@/domain/entities/worker";

export interface UploadWorkerRepository {
  updateAvatar(userId: string, filename: string | undefined): Promise<Worker | null>;
  findById(id: string): Promise<Worker | null>;
  removeAvatar(id: string): Promise<Worker | null>;
}