// src/infra/prisma/PrismaWorkerRepository.ts
import { prisma } from '../database/prisma';
import { WorkerRepository } from '../../domain/repositories/workRepository';
import { Worker } from '../../domain/entities/worker';

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
      data.createdAt
    );
  }

  async getAllWorker(): Promise<Worker[] | null> {
      const data = await this.connect.worker.findMany()
      if (!data) return null;

      return data
  }

  async update(id: string, data: Worker): Promise<Worker | null> {
      const work = await this.connect.worker.update({
        where: {id},
        data
      });

      if (!work) return null;

      return work
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

      return workById
  }
}
