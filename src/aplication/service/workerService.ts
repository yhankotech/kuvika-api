// src/application/services/CreateWorkerService.ts
import { CreateWorkerDTO, ReturnWorkerDTO, UpdateWorkerDTO, LoginDTO } from '../../interfaces/dtos/workerDto';
import { WorkerRepository } from '../../domain/repositories/workRepository';
import { WorkerMapper } from '../../infra/mappers/workerMapper';
import  { hash } from 'bcryptjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { InvalidCredentials, ResourceNotFoundError } from '../../shared/errors/error';
import {  sendEmail } from "../../adapter/email/sendEmail";

export class WorkerService {
  constructor(private readonly workerRepository: WorkerRepository) {}

  async execute({ email, password }: LoginDTO) {
    const user = await this.workerRepository.findByEmail(email);

    if (!user) throw new ResourceNotFoundError();

    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) throw new InvalidCredentials();

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

    return {
      token,
      user: WorkerMapper.toResponse(user)
    };
  }

  async create(dto: CreateWorkerDTO): Promise<void> {
    const hashedPassword = await hash(dto.password, 10);
    const worker = WorkerMapper.toDomain(dto, hashedPassword);

    const code = Math.floor(Math.random() * 100000);
    await sendEmail(worker.email, "cadastro",  worker.fullName, code);

    await this.workerRepository.create(worker);
  }

  async getAll(): Promise<ReturnWorkerDTO[] | null> {
    const workers = await this.workerRepository.getAllWorker();
    if (!workers) return null;
    return workers.map(worker => WorkerMapper.toReturnDTO(worker));
  }

  async getById(id: string): Promise<ReturnWorkerDTO | null> {
    const worker = await this.workerRepository.getById(id);
    if (!worker) return null;
    return WorkerMapper.toReturnDTO(worker);
  }

  async findByEmail(email: string) {
    const worker =  await this.workerRepository.findByEmail(email);

    if(!worker){
      new ResourceNotFoundError()
    }

    return worker
  }

  async update(id: string, dto: UpdateWorkerDTO): Promise<ReturnWorkerDTO | null> {
    const existing = await this.workerRepository.getById(id);
    if (!existing) return null;

    const updated = WorkerMapper.toDomainForUpdate(id, dto, existing);
    const result = await this.workerRepository.update(id, updated);

    if (!result) return null;
    return WorkerMapper.toReturnDTO(result);
  }

  async delete(id: string): Promise<void> {
    await this.workerRepository.delete(id);
  }
}
