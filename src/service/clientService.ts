import {
  CreateClientDTO,
  UpdateClientDTO,
  DeleteClientDTO,
  GetClientByIdDTO,
  GetClientByEmailDTO,
  ReturnClientDTO,
  LoginClientDTO
} from '@/interfaces/dtos/clientDto';
import {  sendEmail } from "@/adapter/email/sendEmail";
import { ClientRepository } from '@/domain/repositories/clientRepository';
import { ClientMapper } from '@/infra/mappers/clientMapper';
import { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { env } from '@/config/env';
import { AppError } from '@/shared/errors/error';

export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async login(data: LoginClientDTO) {
    const client = await this.clientRepository.getByEmail(data.email);

    if (!client) {
      throw new AppError('Credenciais inválidas', 401);
    }

    const passwordMatch = await bcrypt.compare(data.password, client.password);

    if (!passwordMatch) {
      throw new AppError('Credenciais inválidas');
    }

    const token = jwt.sign(
      {
        id: client.id,
        role: 'client' as const
      },
      env.JWT_SECRET,
      {
        expiresIn: '7d',
        subject: client.id 
      }
    );

    return {
      token,
      client: ClientMapper.toHttp(client)
    };
  }

  async create(dto: CreateClientDTO): Promise<void> {
    const hashedPassword = await hash(dto.password, 10);

    const client = ClientMapper.toDomain(dto, hashedPassword);

    if(!client) throw new AppError("Cliente não encontrado !", 404);

    const code = Math.floor(Math.random() * 100000);
    sendEmail(client.email, "cadastro",  client.fullName, code);

    await this.clientRepository.create(client);
  }

  async getAll(): Promise<ReturnClientDTO[] | null> {
    const clients = await this.clientRepository.getAll();

    if (!clients) throw new AppError("Clientes não encontrado !", 404);

    return clients.map(ClientMapper.toReturnDTO);
  }

  async getById(dto: GetClientByIdDTO): Promise<ReturnClientDTO | null> {
    const client = await this.clientRepository.getById(dto.id);

    if (!client) throw new AppError("Cliente não encontrado !", 404);

    return ClientMapper.toReturnDTO(client);
  }

  async getByEmail(dto: GetClientByEmailDTO): Promise<ReturnClientDTO | null> {
    const client = await this.clientRepository.getByEmail(dto.email);

    if (!client) throw new AppError("Cliente não encontrado !", 404);

    return ClientMapper.toReturnDTO(client);
  }

  async update(id: string, dto: UpdateClientDTO): Promise<ReturnClientDTO | null> {
    const existing = await this.clientRepository.getById(id);

    if (!existing) throw new AppError("Cliente não encontrado !", 404);

    if (dto.password) {
      dto.password = await hash(dto.password, 10);
    }

    const updated = ClientMapper.toDomainForUpdate(id, dto, existing);

    const result = await this.clientRepository.update(id, updated);

    if (!result) throw new AppError("Cliente não encontrado !", 404);
    
    return ClientMapper.toReturnDTO(result);
  }

  async delete(dto: DeleteClientDTO): Promise<void> {
    await this.clientRepository.delete(dto.id);
  }

  async getProfile(userId: string, role: "client" | "worker") {
    const user = await this.clientRepository.getById(userId);

    if(!user) throw new AppError("Perfil não encontrado !", 404);
    
      if (role === 'client') {
      
      return await this.clientRepository.getProfile(userId)
    }
  }
}