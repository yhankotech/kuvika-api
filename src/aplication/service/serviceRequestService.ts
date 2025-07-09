import { ServiceRequestRepository } from "../../domain/repositories/serviceRepository";
import { ServiceRequestDTO } from "../../interfaces/dtos/serviceRequestDTO";
import { ClientRepository } from "../../domain/repositories/clientRepository"
import { WorkerRepository } from "../../domain/repositories/workRepository"
import { ResourceNotFoundError } from "../../shared/errors/error";

export class ServiceRequestUseCase {
  constructor(
      private serviceRequestRepository: ServiceRequestRepository,
      private clientRepository: ClientRepository,
      private workerRepository: WorkerRepository
    ) {}

  async create(data: ServiceRequestDTO) {
    const clintId = await this.clientRepository.getById(data.clientId);

    if(!clintId) throw new ResourceNotFoundError()

    const workerId = await this.workerRepository.getById(data.clientId);

    if(!workerId) throw new ResourceNotFoundError()
    
    const request = await this.serviceRequestRepository.create(data);
    return request;
  }

  async clientList(clientId: string) {
    return await this.serviceRequestRepository.findByClientId(clientId);
  }

   async workerList(workerId: string) {
    return await this.serviceRequestRepository.findByWorkerId(workerId);
  }

  async updateRequestStatus(id: string, status: string) {
    return await this.serviceRequestRepository.updateStatus(id, status);
  }

  async deleteServiceRequest(id: string) {
    return await this.serviceRequestRepository.delete(id);
  }

}