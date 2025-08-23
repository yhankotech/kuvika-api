import { Worker } from '@/domain/entities/worker';
import { randomUUID } from 'crypto';
import { CreateWorkerDTO, ReturnWorkerDTO, UpdateWorkerDTO } from '@/http/dtos/workerDto';

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
      dto.avatar ?? '',
      new Date(),
      dto.availability
    );
  }

  static toDomainFromPersistence(data: any): Worker {
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
      data.avatar
    );
  }

  static toReturnDTO(worker: Worker): ReturnWorkerDTO {
    return {
      id: worker.id,
      fullName: worker.fullName,
      email: worker.email,
      phoneNumber: worker.phoneNumber,
      serviceTypes: worker.serviceTypes,
      location: worker.location,
      availability: worker.availability,
      createdAt: worker.createdAt
    };
  }

  static toDomainForUpdate(id: string, dto: UpdateWorkerDTO, existing: Worker): Worker {
    return new Worker(
      id,
      dto.fullName ?? existing.fullName,
      existing.email, // email não é editável
      existing.password, // senha não é alterada aqui
      dto.phoneNumber ?? existing.phoneNumber,
      dto.serviceTypes ?? existing.serviceTypes,
      dto.location ?? existing.location,
      dto.availability ?? existing.availability,
      existing.createdAt,
      existing.avatar
    );
  }

  static toResponse(user: Worker) {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    };
  }
}