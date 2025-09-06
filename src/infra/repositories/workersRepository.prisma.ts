import { prisma } from '@/infra/database/prisma';
import { WorkerRepository } from '@/domain/repositories/workRepository';
import { Worker, WorkerSearch } from '@/domain/entities/worker';
import { AppError } from '@/shared/errors/error';
import { r } from '@faker-js/faker/dist/airline-CLphikKp';

export class PrismaWorkerRepository implements WorkerRepository {
  private connect = prisma;

  async create(worker: Worker): Promise<Worker> {
    const created = await this.connect.worker.create({
      data: {
        id: worker.id,
        fullName: worker.fullName,
        email: worker.email,
        password: worker.password,
        phoneNumber: worker.phoneNumber,
        serviceTypes: worker.serviceTypes,
        location: worker.location,
        availability: worker.availability,
        createdAt: worker.createdAt,
        activationCode: worker.activationCode,
        isActive: worker.isActive,
        avatar: worker.avatar ?? undefined,
        municipality: worker.municipality,
        neighborhood: worker.neighborhood,
        profession: worker.profession,
        experience: worker.experience,
        birth_date: worker.birth_date,
        gender: worker.gender,
      }
    });

    return new Worker(
      created.id,
      created.fullName,
      created.email,
      created.password,
      created.phoneNumber,
      created.serviceTypes,
      created.location,
      created.availability,
      created.createdAt,
      created.avatar ?? null,
      created.neighborhood ?? null,
      created.activationCode ?? null,
      created.isActive,
      created.municipality ?? undefined,
      created.profession ?? undefined,
      created.experience ?? undefined,
      created.birth_date ?? undefined,
      created.gender ?? undefined,
    );
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
      data.avatar ?? null,
      data.neighborhood ?? null,
      data.activationCode ?? null,
      data.isActive,
      data.municipality ?? undefined,
      data.profession ?? undefined,
      data.experience ?? undefined,
      data.birth_date ?? undefined,
      data.gender ?? undefined,
    );
  }

  async getAllWorker(): Promise<Worker[] | null> {
  const workers = await this.connect.worker.findMany();

  if (!workers || workers.length === 0) return null;

  return workers.map(worker => new Worker(
    worker.id,
    worker.fullName,
    worker.email,
    worker.password,
    worker.phoneNumber,
    worker.serviceTypes,
    worker.location,
    worker.availability,
    worker.createdAt,
    worker.avatar ?? null,
    worker.neighborhood ?? null,
    worker.activationCode ?? null,
    worker.isActive,
    worker.municipality ?? undefined,
    worker.profession ?? undefined,
    worker.experience ?? undefined,
    worker.birth_date ?? undefined,
    worker.gender ?? undefined,
  ));
}

  async update(id: string, data: Worker): Promise<Worker | null> {
  const updated = await this.connect.worker.update({
    where: { id },
    data
  });

  if (!updated) return null;

  return new Worker(
    updated.id,
    updated.fullName,
    updated.email,
    updated.password,
    updated.phoneNumber,
    updated.serviceTypes,
    updated.location,
    updated.availability,
    updated.createdAt,
    updated.avatar ?? null,
    updated.neighborhood ?? null,
    updated.activationCode ?? null,
    updated.isActive,
    updated.municipality ?? undefined,
    updated.profession ?? undefined,
    updated.experience ?? undefined,
    updated.birth_date ?? undefined,
    updated.gender ?? undefined,
  );
}

  async delete(id: string): Promise<void> {
      await this.connect.worker.delete({
        where: { id }
      });
  }

   async getById(id: string): Promise<Worker | null> {
    const data = await this.connect.worker.findUnique({
      where: { id }
    });

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
      data.avatar ?? null,
      data.neighborhood ?? null,
      data.activationCode ?? null,
      data.isActive,
      data.municipality ?? undefined,
      data.profession ?? undefined,
      data.experience ?? undefined,
      data.birth_date ?? undefined,
      data.gender ?? undefined,
    );
  }

  async getProfile(id: string): Promise<Worker> {
    const user = await this.connect.worker.findFirst({
      where: { id },
      select: {
        id: true,
        fullName: true,
        email: true,
        password: true,
        phoneNumber: true,
        location: true,
        createdAt: true,
        availability: true,
        serviceTypes: true,
        avatar: true,
        neighborhood: true,
        activationCode: true,
        isActive: true,
        municipality: true,
        profession: true,
        experience: true,
        birth_date: true,
        gender: true,
      },
    });

    if (!user) throw new AppError("Worker not found");

    return new Worker(
      user.id,
      user.fullName,
      user.email,
      user.password,
      user.phoneNumber,
      user.serviceTypes,
      user.location,
      user.availability,
      user.createdAt,
      user.avatar ?? null,
      user.neighborhood ?? null,
      user.activationCode ?? null,
      user.isActive,
      user.municipality ?? undefined,
      user.profession ?? undefined,
      user.experience ?? undefined,
      user.birth_date ?? undefined,
      user.gender ?? undefined,
    );
  }


   async searchWorkers(location?: string, serviceType?: string, minRating?: number): Promise<WorkerSearch[] | null> {

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

    if (!workers || workers.length === 0) return null;

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
        null,
      ));

    return result;
  }

  async updateActivation(workerId: string, isActive: boolean): Promise<void> {
    await prisma.worker.update({
      where: { id: workerId },
      data: { isActive, activationCode: null },
    });
  }
}
