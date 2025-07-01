// src/application/mappers/WorkerMapper.ts
import { Worker } from '../../domain/entities/worker';
import { randomUUID } from 'crypto';
import { CreateWorkerDTO } from '../../interfaces/dtos/workerDto';

export class WorkerMapper {
  static toDomain(dto: CreateWorkerDTO, hashedPassword: string): Worker {
    return new Worker(
      randomUUID(),
      dto.fullName,
      dto.email,
      hashedPassword,
      dto.phoneNumber,
      dto.serviceTypes,
      dto.location,
      dto.availability,
      new Date()
    );
  }
}