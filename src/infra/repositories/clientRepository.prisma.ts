import { prisma } from '@/infra/database/prisma';
import { Client } from '@/domain/entities/client';
import { ClientRepository } from '@/domain/repositories/clientRepository';
import { AppError } from '@/shared/errors/error';

export class PrismaClientRepository implements ClientRepository {
  private connect = prisma;

  async create(data: Client): Promise<Client> {
    const user = await this.connect.client.create({ 
      data:{
        ...data,
        activationCode: data.activationCode,
        isActive: false,
        avatar: data.avatar === null ? undefined : data.avatar,
      }
     });
    return {
      ...user,
      avatar: user.avatar === null ? undefined : user.avatar,
    } as Client;
  }

  async getAll(): Promise<Client[]> {
    const users = await this.connect.client.findMany();
    return users.map(user => ({
      ...user,
      avatar: user.avatar === null ? undefined : user.avatar,
    })) as Client[];
  }

  async getById(id: string): Promise<Client | null> {
    const user = await this.connect.client.findUnique({ 
      where: { id }
     });

    if (!user) return null;

    // Convert avatar: null to avatar: undefined for compatibility with Client type
    return {
      ...user,
      avatar: user.avatar === null ? undefined : user.avatar,
    } as Client;
  }

  async getByEmail(email: string): Promise<Client | null> {
    const user = await this.connect.client.findUnique({ where: { email } });

    if (!user) throw new AppError("Email não encontrado");

    return {
      ...user,
      avatar: user.avatar === null ? undefined : user.avatar,
    } as Client;
  }

  async update(id: string, data: Partial<Client>): Promise<Client | null> {
    const user = await this.connect.client.update({ where: { id }, data });
    if (!user) return null;
    return {
      ...user,
      avatar: user.avatar === null ? undefined : user.avatar,
    } as Client;
  }

  async delete(id: string): Promise<void> {
    await this.connect.client.delete({ where: { id } });
  }

  async getProfile (id: string): Promise<Client>{

    const user = await this.connect.client.findUnique({ 
      where: { id },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        location: true,
        avatar: true,
        createdAt: true,
    }});

    return user as Client;

  }

  
  async updateActivation(clientId: string, isActive: boolean): Promise<void> {
    await prisma.client.update({
      where: { id: clientId },
      data: { isActive, activationCode: null },
    });
  }
}