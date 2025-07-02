import { prisma } from '../database/prisma';
import { Client } from '../../domain/entities/client';
import { ClientRepository } from '../../domain/repositories/clientRepository';

export class PrismaClientRepository implements ClientRepository {
  private connect = prisma;

  async create(data: Client): Promise<Client> {
    return await this.connect.client.create({ data });
  }

  async getAll(): Promise<Client[]> {
    return await this.connect.client.findMany();
  }

  async getById(id: string): Promise<Client | null> {
    return await this.connect.client.findUnique({ where: { id } });
  }

  async getByEmail(email: string): Promise<Client | null> {
    return await this.connect.client.findUnique({ where: { email } });
  }

  async update(id: string, data: Partial<Client>): Promise<Client | null> {
    return await this.connect.client.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.connect.client.delete({ where: { id } });
  }
}
