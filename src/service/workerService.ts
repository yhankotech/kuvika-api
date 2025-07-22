import { CreateWorkerDTO, ReturnWorkerDTO, UpdateWorkerDTO, LoginDTO, SearchWorkersDTO } from '@/interfaces/dtos/workerDto';
import { WorkerRepository } from '@/domain/repositories/workRepository';
import { WorkerMapper } from '@/infra/mappers/workerMapper';
import  { hash } from 'bcryptjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from '@/shared/errors/error';
import {  sendEmail } from "@/adapter/email/sendEmail";
import { env } from '@/config/env';
import { RatingRepository } from "@/domain/repositories/ratingRepository"

export class WorkerService {
  constructor(
    private readonly workerRepository: WorkerRepository,
    private ratingRepository: RatingRepository
  ) {}

  async execute({ email, password }: LoginDTO) {
    const worker = await this.workerRepository.findByEmail(email);

    if (!worker) throw new AppError("Trabalhador não encotrado!", 404);

    const passwordMatch = await bcrypt.compare(password, worker.password);
    
    if (!passwordMatch) throw new AppError("Palavra passe incorreta", 401);

    const token = jwt.sign(
      {
        id: worker.id,
          role: 'worker' as const
      },
      env.JWT_SECRET,
      {
        expiresIn: '7d',
        subject: worker.id 
      }
    );
    
    return {
      token,
      client: WorkerMapper.toReturnDTO(worker)
    };
  }

  async create(dto: CreateWorkerDTO): Promise<void> {
    const hashedPassword = await hash(dto.password, 10);
    const worker = WorkerMapper.toDomain(dto, hashedPassword);

    const code = Math.floor(Math.random() * 100000);
    sendEmail(worker.email, "cadastro",  worker.fullName, code);

    await this.workerRepository.create(worker);
  }

  async getAll(): Promise<ReturnWorkerDTO[] | null> {
    const workers = await this.workerRepository.getAllWorker();

    if (!workers) throw new AppError("Trabalhador não encontrado !", 404);

    return workers.map(worker => WorkerMapper.toReturnDTO(worker));
  }

  async getById(id: string): Promise<ReturnWorkerDTO | null> {
    const worker = await this.workerRepository.getById(id);

    if (!worker) throw new AppError("Trabalhador não encontrado!", 404);

    return WorkerMapper.toReturnDTO(worker);
  }

  async findByEmail(email: string): Promise<ReturnWorkerDTO | null> {
    const worker =  await this.workerRepository.findByEmail(email);

    if(!worker){
      throw new AppError("Trabalhor não encontrado", 404)
    }

    return WorkerMapper.toReturnDTO(worker);
  }

  async update(id: string, dto: UpdateWorkerDTO): Promise<ReturnWorkerDTO | null> {
    const existing = await this.workerRepository.getById(id);

    if (!existing)  throw new AppError("Trabalhador não encontrado !", 404)

    const updated = WorkerMapper.toDomainForUpdate(id, dto, existing);

    const result = await this.workerRepository.update(id, updated);

    if (!result) throw new AppError("Trabalhador não encontrado !", 404);

    return WorkerMapper.toReturnDTO(result);
  }

  async delete(id: string): Promise<void> {
    await this.workerRepository.delete(id);
  }

   async getProfile(userId: string, role: "client" | "worker") {
    const user = await this.workerRepository.getById(userId);

    if(!user) throw new AppError("Perfil não encontrado !", 404)
    
    if (role ===  'worker') {
      const averageRating = await this.ratingRepository.getAverageRatingByWorker(userId);

      return {
        ...user,
        averageRating,
      };
    }
  }

  async search(filters: SearchWorkersDTO) {
    return this.workerRepository.searchWorkers(filters);
  }
}
