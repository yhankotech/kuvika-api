import { prisma } from "../../infra/database/prisma";
import { ServiceRequestRepository } from "../../domain/repositories/serviceRepository";
import { Service } from "../../domain/entities/service";
import { ServiceRequestDTO } from "../../interfaces/dtos/serviceRequestDTO";

export class PrismaServiceRequestRepository implements ServiceRequestRepository {
    private conn = prisma

  async create(data: ServiceRequestDTO): Promise<Service> {
    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        ...data,
        status: data.status || "pendente",
      },
    });
    return serviceRequest;
  }

  async findByClientId(clientId: string): Promise<Service[]> {
    return await prisma.serviceRequest.findMany({
        where: { clientId },
            include: {
            worker: {
                select: {
                fullName: true,
                serviceTypes: true,
                availability: true,
                },
            },
            },
        });
    }

    async findByWorkerId(workerId: string): Promise<Service[]> {
        return await prisma.serviceRequest.findMany({
            where: { workerId },
            include: {
            client: {
                select: {
                fullName: true,
                ratingsGiven: true,
                serviceRequests: true
                },
            
            },
            },
        });
    }

    async updateStatus(id: string, status: string): Promise<Service | null> {
        return await prisma.serviceRequest.update({
            where: { id },
            data: { status },
        });
  }
  
  async delete(id:string): Promise<void>{
    await this.conn.serviceRequest.delete({
        where:{
            id
        }
    })
  }


}
