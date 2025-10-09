import { ServiceRequestDTO } from "@/http/dtos/serviceRequestDTO";
import { Service } from "@/domain/entities/service";
import { ServiceWithRelations } from "@/infra/database/typePrisma";

export interface ServiceRequestRepository {
  create(data: ServiceRequestDTO): Promise<Service>;
  findByClientId(clientId: string): Promise<Service[]>;
  findByWorkerId(workerId: string): Promise<Service[]>;
  findByIdWithRelations(id: string): Promise<ServiceWithRelations | null>
  updateStatus(id: string, status: string): Promise<Service | null>;
  delete( id: string): Promise<void>;
}
