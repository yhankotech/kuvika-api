import { prisma } from "../../infra/database/prisma";
import { ServiceWithRelations } from "../../infra/database/typePrisma";
import { ServiceRequestRepository } from "../../domain/repositories/serviceRepository";
import { Service } from "../../domain/entities/service";
import { ServiceRequestDTO } from "../../interfaces/dtos/serviceRequestDTO";
import { ResourceNotFoundError } from "../../shared/errors/error";

export class PrismaServiceRequestRepository implements ServiceRequestRepository {
    private conn = prisma

  async create(data: ServiceRequestDTO): Promise<Service> {
    const serviceRequest = await this.conn.serviceRequest.create({
      data: {
        ...data,
        status: data.status || "pendente",
      },
    });
    return serviceRequest;
  }

  async findByClientId(clientId: string): Promise<Service[]> {
    return await this.conn.serviceRequest.findMany({
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
        return await this.conn.serviceRequest.findMany({
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
        return await this.conn.serviceRequest.update({
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

  async findByIdWithRelations(id: string): Promise<ServiceWithRelations | null> {
    const service = await this.conn.serviceRequest.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            email: true,
            fullName: true,
          },
        },
        worker: {
          select: {
            fullName: true,
          },
        },
      },
    });

    if(!service) throw new ResourceNotFoundError()

    return service
  }

}
