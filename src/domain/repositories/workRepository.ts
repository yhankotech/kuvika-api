import { Worker,  WorkerSearch} from '@/domain/entities/worker';

export interface WorkerRepository {
  create(worker: Worker): Promise<Worker>;
  findByEmail(email: string): Promise<Worker | null>;
  getAllWorker(): Promise<Worker[] | null>;
  update(id:string, data:Worker): Promise<Worker | null>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<Worker | null>;
  getProfile (id: string): Promise<Worker>
  searchWorkers( location?: string, serviceType?: string, minRating?: number): Promise<WorkerSearch[] | null>;
  updateActivation(clientId: string, isActive: boolean): Promise<void>
}
