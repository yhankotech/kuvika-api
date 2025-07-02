import { Client } from '../entities/client';

export interface ClientRepository {
  create(client: Client): Promise<Client>;
  getAll(): Promise<Client[]>;
  getById(id: string): Promise<Client | null>;
  getByEmail(email: string): Promise<Client | null>;
  update(id: string, data: Partial<Client>): Promise<Client | null>;
  delete(id: string): Promise<void>;
}