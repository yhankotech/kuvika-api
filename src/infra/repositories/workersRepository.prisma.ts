// src/infra/prisma/PrismaWorkerRepository.ts
import { prisma } from '../database/prisma';
import { WorkerRepository } from '../../domain/repositories/workRepository';
import { Worker } from '../../domain/entities/worker';

export class PrismaWorkerRepository implements WorkerRepository {
  async create(worker: Worker): Promise<void> {
    await prisma.worker.create({
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
    const data = await prisma.worker.findUnique({ where: { email } });
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
      data.createdAt
    );
  }
}
