import { prisma } from '@/infra/database/prisma';
import { WorkerRepository } from '@/domain/repositories/workRepository';
import { Worker, WorkerSearch } from '@/domain/entities/worker';
import { SearchWorkersDTO } from "@/interfaces/dtos/workerDto";

export class PrismaWorkerRepository implements WorkerRepository {
  private connect = prisma;

  async create(worker: Worker): Promise<void> {
    await this.connect.worker.create({
      data: {
        id: worker.id,
        fullName: worker.fullName,
        email: worker.email,
        password: worker.password,
        phoneNumber: worker.phoneNumber,
        serviceTypes: worker.serviceTypes,
        location: worker.location,
        availability: worker.availability,
        createdAt: worker.createdAt
      }
    });
  }

  async findByEmail(email: string): Promise<Worker | null> {
    const data = await this.connect.worker.findUnique({ where: { email } });
    if (!data) return null;

    return new Worker(
      data.id,
      data.fullName,
      data.email,
      data.password,
      data.phoneNumber,
      data.serviceTypes,
      data.location,
      data.availability,
      data.createdAt,
      data.avatar ?? undefined
    );
  }

  async getAllWorker(): Promise<Worker[] | null> {
      const data = await this.connect.worker.findMany()
      if (!data) return null;

      return data.map(worker => new Worker(
        worker.id,
        worker.fullName,
        worker.email,
        worker.password,
        worker.phoneNumber,
        worker.serviceTypes,
        worker.location,
        worker.availability,
        worker.createdAt,
        worker.avatar ?? undefined
      ));
  }

  async update(id: string, data: Worker): Promise<Worker | null> {
      const work = await this.connect.worker.update({
        where: {id},
        data
      });

      if (!work) return null;

      return new Worker(
        work.id,
        work.fullName,
        work.email,
        work.password,
        work.phoneNumber,
        work.serviceTypes,
        work.location,
        work.availability,
        work.createdAt,
        work.avatar ?? undefined
      )
  }

  async delete(id: string): Promise<void> {
      await this.connect.worker.delete({
        where: { id }
      });
  }

  async getById(id: string): Promise<Worker | null> {
      const workById = await this.connect.worker.findUnique({
        where: {
          id
        }
      })

      if(!workById)return null;

      return new Worker(
        workById.id,
        workById.fullName,
        workById.email,
        workById.password,
        workById.phoneNumber,
        workById.serviceTypes,
        workById.location,
        workById.availability,
        workById.createdAt,
        workById.avatar ?? undefined
      );
  }

  async getProfile (id: string): Promise<Worker>{
    const user =  await this.connect.worker.findUnique({ 
        where: { id },
        select: {
            id: true,
            fullName: true,
            email: true,
            phoneNumber: true,
            location: true,
            createdAt: true,
            availability: true,
            ratingsReceived: true,
            serviceTypes: true,
            avatar: true 
      }});

      if (!user) {
        throw new Error('Worker not found');
      }

      return new Worker(
        user.id,
        user.fullName,
        user.email,
        user.avatar ?? "",
        user.phoneNumber,
        user.serviceTypes,
        user.location,
        user.availability,
        user.createdAt
      );
    }

   async searchWorkers(filters: SearchWorkersDTO): Promise<WorkerSearch[]> {
    const { location, serviceType, minRating } = filters;

    const workers = await this.connect.worker.findMany({
      where: {
        ...(location && {
          location: {
            contains: location,
            mode: 'insensitive',
          },
        }),
        ...(serviceType && {
          serviceTypes: {
            has: serviceType,
          },
        }),
      },
      include: {
        ratingsReceived: true,
      },
    });

    const result: WorkerSearch[] = workers
      .map(worker => {
        const ratings = worker.ratingsReceived;
        const avgRating =
          ratings.length > 0
            ? ratings.reduce((acc, r) => acc + r.score, 0) / ratings.length
            : 0;

        return {
          id: worker.id,
          fullName: worker.fullName,
          email: worker.email,
          phoneNumber: worker.phoneNumber,
          location: worker.location,
          serviceTypes: worker.serviceTypes,
          averageRating: avgRating,
          description: 'Trabalhador dedicado e confiável',
        };
      })
      .filter(worker => !minRating || worker.averageRating >= minRating)
      .map(worker => new WorkerSearch(
        worker.id,
        worker.fullName,
        worker.email,
        worker.phoneNumber,
        worker.location,
        Array.isArray(worker.serviceTypes) ? worker.serviceTypes.join(', ') : worker.serviceTypes,
        [worker.averageRating.toString()],
        worker.averageRating,
        null 
      ));

    return result;
  }

}
