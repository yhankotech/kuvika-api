// src/application/services/CreateWorkerService.ts
import { CreateWorkerDTO } from '../../interfaces/dtos/workerDto';
import { WorkerRepository } from '../../domain/repositories/workRepository';
import { WorkerMapper } from '../../infra/mappers/workerMapper';
import bcrypt from 'bcryptjs';

export class WorkerService {
  constructor(private workerRepository: WorkerRepository) {}

  async execute(dto: CreateWorkerDTO): Promise<void> {
    const existingWorker = await this.workerRepository.findByEmail(dto.email);
    if (existingWorker) throw new Error('Email já está em uso');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const worker = WorkerMapper.toDomain(dto, hashedPassword);

    await this.workerRepository.create(worker);
  }
}