import { Worker,  WorkerSearch} from '@/domain/entities/worker';
import { SearchWorkersDTO } from "@/interfaces/dtos/workerDto";

export interface WorkerRepository {
  create(worker: Worker): Promise<void>;
  findByEmail(email: string): Promise<Worker | null>;
  getAllWorker(): Promise<Worker[] | null>;
  update(id:string, data:Worker): Promise<Worker | null>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<Worker | null>;
  getProfile (id: string): Promise<Worker>
  searchWorkers(filters: SearchWorkersDTO): Promise<WorkerSearch[]>;
}
