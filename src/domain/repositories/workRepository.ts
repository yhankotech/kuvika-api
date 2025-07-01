// src/domain/repositories/WorkerRepository.ts
import { Worker } from '../entities/worker';

export interface WorkerRepository {
  create(worker: Worker): Promise<void>;
  findByEmail(email: string): Promise<Worker | null>;
}
