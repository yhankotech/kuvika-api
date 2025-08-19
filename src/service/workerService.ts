import { CreateWorkerDTO, ReturnWorkerDTO, UpdateWorkerDTO, LoginDTO, ActivateWorkerDTO } from '@/interfaces/dtos/workerDto';
import { WorkerRepository } from '@/domain/repositories/workRepository';
import { WorkerMapper } from '@/infra/mappers/workerMapper';
import  { hash } from 'bcryptjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from '@/shared/errors/error';
import {  sendActivationEmail } from "@/adapter/email/sendEmailCode";
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
      token
    };
  }

  async create(dto: CreateWorkerDTO): Promise<void> {
    const hashedPassword = await hash(dto.password, 10);
    const worker = WorkerMapper.toDomain(dto, hashedPassword);

    if(!worker) throw new AppError("Trabalhador não encontrado !", 404);

    const code = Math.floor(Math.random() * 100000);

    const userWorker = await this.workerRepository.create({
      ...worker,
      activationCode: code.toString(),
      isActive: false,
    });

     // Enviar email com código
    await sendActivationEmail({
      to: userWorker.email,
      name: userWorker.fullName,
      code: code.toString(),
    });      
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

  async getProfile(userId: string) {
    const user = await this.workerRepository.getById(userId);

    if(!user) throw new AppError("Perfil não encontrado !", 404)
    
      const averageRating = await this.ratingRepository.getAverageRatingByWorker(userId);

      return {
        ...user,
        averageRating,
      };
  }

  async search(location?: string, serviceType?: string, minRating?: number) {
    return this.workerRepository.searchWorkers(location, serviceType, minRating);
  }

  async activate(dto: ActivateWorkerDTO): Promise<void> {
      const worker = await this.workerRepository.findByEmail(dto.email);
      
      if (!worker) throw new AppError("Trabalhador não encontrado!", 404);

      if (worker.activationCode !== dto.code) {
        throw new AppError("Código de ativação inválido!", 400);
      }

      await this.workerRepository.updateActivation(worker.id, true);
    }
  
}
