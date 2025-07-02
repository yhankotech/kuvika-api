// src/domain/repositories/WorkerRepository.ts
import { Worker } from '../entities/worker';

export interface WorkerRepository {
  create(worker: Worker): Promise<void>;
  findByEmail(email: string): Promise<Worker | null>;
  getAllWorker(): Promise<Worker[] | null>;
  update(id:string, data:Worker): Promise<Worker | null>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<Worker | null>;
}
