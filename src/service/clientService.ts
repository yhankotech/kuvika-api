import {
  CreateClientDTO,
  UpdateClientDTO,
  DeleteClientDTO,
  GetClientByIdDTO,
  ReturnClientDTO,
  LoginClientDTO,
  ActivateClientDTO
} from '@/http/dtos/clientDto';
import {  sendActivationEmail } from "@/adapter/email/sendEmailCode";
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
    };
  }

  async create(dto: CreateClientDTO): Promise<void> {
    const hashedPassword = await hash(dto.password, 10);

    const client_by_email = await this.clientRepository.getByEmail(dto.email);

    if(client_by_email) throw new AppError("Cliente já cadastrado com esse e-mail !", 409);

    const client = ClientMapper.toDomain(dto, hashedPassword);

    // Código de ativação (6 dígitos)
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Criar cliente no banco
    const userClient = await this.clientRepository.create({
      ...client,
      activationCode: code,
      isActive: false,
    });

     // Enviar email com código
    await sendActivationEmail({
      to: userClient.email,
      name: userClient.fullName,
      code,
    });
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

  async getByEmail(email:string): Promise<ReturnClientDTO> {

    const client = await this.clientRepository.getByEmail(email);

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

  async getProfile(userId: string,) {
    const user = await this.clientRepository.getById(userId);

    if(!user) throw new AppError("Perfil não encontrado !", 404);
      
    return await this.clientRepository.getProfile(userId)
  }

  async activate(dto: ActivateClientDTO): Promise<void> {
    const client = await this.clientRepository.getByEmail(dto.email);
    if (!client) throw new AppError("Cliente não encontrado!", 404);

    if (client.activationCode !== dto.code) {
      throw new AppError("Código de ativação inválido!", 400);
    }

    await this.clientRepository.updateActivation(client.id, true);
  }
}