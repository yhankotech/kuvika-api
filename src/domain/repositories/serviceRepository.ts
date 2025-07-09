import { ServiceRequestDTO } from "../../interfaces/dtos/serviceRequestDTO";
import { Service } from "../../domain/entities/service";

export interface ServiceRequestRepository {
  create(data: ServiceRequestDTO): Promise<Service>;
  findByClientId(clientId: string): Promise<Service[]>;
  findByWorkerId(workerId: string): Promise<Service[]>;
  updateStatus(id: string, status: string): Promise<Service | null>;
  delete( id: string): Promise<void>;
}
