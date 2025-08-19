import { Client } from '@/domain/entities/client';
import {
  CreateClientDTO,
  UpdateClientDTO,
  ReturnClientDTO
} from '@/interfaces/dtos/clientDto';
import { randomUUID } from 'crypto';

export class ClientMapper {
  static toDomain(dto: CreateClientDTO, hashedPassword: string): Client {
    return new Client(
      randomUUID(),  
      dto.fullName,
      dto.email,   
      hashedPassword,
      dto.location,
      dto.phone,
      dto.avatar,
)
  }

  static toDomainForUpdate(id: string, dto: UpdateClientDTO, existing: Client): Client {
    return {
      id,
      fullName: dto.fullName ?? existing.fullName,
      email: dto.email ?? existing.email,
      password: dto.password ?? existing.password,
      phone: dto.phone ?? existing.phone,
      location: dto.location ?? existing.location,
      avatar: dto.avatar ?? existing.avatar,
      createdAt: existing.createdAt,
      updatedAt: existing.updatedAt,
      activationCode: existing.activationCode,
      isActive: existing.isActive,
    };
  }

  static toReturnDTO(client: Client): ReturnClientDTO {
    return {
      id: client.id!,
      fullName: client.fullName,
      email: client.email,
      phone: client.phone,
      location: client.location,
      avatar: client.avatar,
      createdAt: client.createdAt!,
    };
  }

  static toPersistence(client: Client): any {
    return {
      fullName: client.fullName,
      email: client.email,
      password: client.password,
      phone: client.phone,
      location: client.location,
    };
  }

  static toHttp(client: Client) {
    return {
      id: client.id,
      fullName: client.fullName,
      email: client.email,
      phone: client.phone,
      location: client.location,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    };
  }
}
