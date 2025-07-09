import { ServiceRequestRepository } from "../../domain/repositories/serviceRepository";
import { ServiceRequestDTO } from "../../interfaces/dtos/serviceRequestDTO";
import { ClientRepository } from "../../domain/repositories/clientRepository"
import { WorkerRepository } from "../../domain/repositories/workRepository"
import { ResourceNotFoundError } from "../../shared/errors/error";
import { sendEmail } from "../../adapter/email/sendEmail";

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


    sendEmail(workerId.email, "Serviço", data.clientId);
    
    const request = await this.serviceRequestRepository.create(data);

    return request;
  }

  async clientList(clientId: string) {
    return await this.serviceRequestRepository.findByClientId(clientId);
  }

   async workerList(workerId: string) {
    return await this.serviceRequestRepository.findByWorkerId(workerId);
  }

  async updateRequestStatus(id: string, status: "aceito" | "rejeitado") {
    const updated = await this.serviceRequestRepository.updateStatus(id, status);

    if (!updated) throw new ResourceNotFoundError()

    const service = await this.serviceRequestRepository.findByIdWithRelations(id);
    
    if (!service) throw new ResourceNotFoundError();

    const { client, worker } = service;
    
    sendEmail(
      client.email,
      "Serviço",
      `Olá ${client.fullName},\n\n O trabalhador ${worker.fullName} ${status === "aceito" ? "aceitou" : "rejeitou"} o seu pedido de serviço }.\n\nObrigado pela sua preferência!`
    );

    return await this.serviceRequestRepository.updateStatus(id, status);
  }

  async deleteServiceRequest(id: string) {
    return await this.serviceRequestRepository.delete(id);
  }

}