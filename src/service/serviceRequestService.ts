import { ServiceRequestRepository } from "@/domain/repositories/serviceRepository";
import { ServiceRequestDTO } from "@/http/dtos/serviceRequestDTO";
import { ClientRepository } from "@/domain/repositories/clientRepository"
import { WorkerRepository } from "@/domain/repositories/workRepository"
import { AppError } from "@/shared/errors/error";
import { sendServiceRequestEmail, sendServiceResponseEmail } from "@/adapter/email/sendServiceEmail";

export class ServiceRequestUseCase {
  constructor(
      private serviceRequestRepository: ServiceRequestRepository,
      private clientRepository: ClientRepository,
      private workerRepository: WorkerRepository
    ) {}

  async create(data: ServiceRequestDTO) {
    const clintId = await this.clientRepository.getById(data.clientId);

    if(!clintId) throw new  AppError("Cliente não encontrado !", 404);

    const workerId = await this.workerRepository.getById(data.workerId);

    if(!workerId) throw new AppError("Trabalhador não encontrado !", 404);


    sendServiceRequestEmail(workerId.email, workerId.fullName, clintId.fullName);

    const request = await this.serviceRequestRepository.create(data);

    return request;
  }

  async clientList(clientId: string) {
    const cliets = await this.serviceRequestRepository.findByClientId(clientId);

    if(!cliets)throw new AppError("Clientes não encontrado !", 404);

    return cliets
  }

   async workerList(workerId: string) {
    return await this.serviceRequestRepository.findByWorkerId(workerId);
  }

  async updateRequestStatus(id: string, status: "aceito" | "rejeitado") {
    const updated = await this.serviceRequestRepository.updateStatus(id, status);

    if (!updated) throw new AppError("Serviço não encontrado !", 404);

    const service = await this.serviceRequestRepository.findByIdWithRelations(id);
    
    if (!service) throw new AppError("Serviço não encontrado !", 404);;

    const { client, worker } = service;
    
    sendServiceResponseEmail(
      client.email,
      client.fullName,
      worker.fullName,
      status
    );

    return await this.serviceRequestRepository.updateStatus(id, status);
  }

  async deleteServiceRequest(id: string) {
    return await this.serviceRequestRepository.delete(id);
  }

}