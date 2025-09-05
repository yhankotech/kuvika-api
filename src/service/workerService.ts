import { CreateWorkerDTO, ReturnWorkerDTO, UpdateWorkerDTO, LoginDTO, ActivateWorkerDTO } from '@/http/dtos/workerDto';
import { WorkerRepository } from '@/domain/repositories/workRepository';
import  { hash } from 'bcryptjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppError } from '@/shared/errors/error';
import {  sendActivationEmail } from "@/adapter/email/sendEmailCode";
import { env } from '@/config/env';
import { RatingRepository } from "@/domain/repositories/ratingRepository";
import { randomUUID } from 'crypto';

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

   async create(dto: CreateWorkerDTO) {
    const existing = await this.workerRepository.findByEmail(dto.email);
    if (existing) {
      throw new AppError("Trabalhador já cadastrado com esse e-mail!", 409);
    }

    const hashedPassword = await hash(dto.password, 10);
    const code = Math.floor(Math.random() * 100000).toString();

    const saved = await this.workerRepository.create({
      id: randomUUID(),
      fullName: dto.fullName,
      email: dto.email,
      password: hashedPassword,
      phoneNumber: dto.phoneNumber,
      serviceTypes: dto.serviceTypes,
      location: dto.location,
      availability: dto.availability,
      createdAt: new Date(),
      avatar: dto.avatar ?? null,
      neighborhood: dto.neighborhood ?? null,
      activationCode: code,
      isActive: false,
      municipality: dto.municipality ?? "",
      profession: dto.profession ?? "",
      experience: dto.experience,
      birth_date: dto.birth_date,
      gender: dto.gender ?? "",
    });

    await sendActivationEmail({
      to: saved.email,
      name: saved.fullName,
      code
    });

    return saved;
  }

  async getAll() {
    const workers = await this.workerRepository.getAllWorker();

    if (!workers) throw new AppError("Trabalhador não encontrado !", 404);

    return workers;
  }

  async getById(id: string) {
    const worker = await this.workerRepository.getById(id);

    if (!worker) throw new AppError("Trabalhador não encontrado!", 404);

    return worker;
  }

  async findByEmail(email: string) {
    const worker =  await this.workerRepository.findByEmail(email);

    if(!worker){
      throw new AppError("Trabalhor não encontrado", 404)
    }

    return worker;
  }

  async update(id: string, dto: UpdateWorkerDTO) {
    const existing = await this.workerRepository.getById(id);

    if (!existing)  throw new AppError("Trabalhador não encontrado !", 404)

    const updated = await this.workerRepository.update(id, {
      ...existing,
      ...dto
    });

    if (!updated) throw new AppError("Erro ao atualizar trabalhador!", 400);

    return updated;
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

    const workers_services = await this.workerRepository.searchWorkers(location, serviceType, minRating);

    if (!workers_services || workers_services.length === 0) {
      throw new AppError("Nenhum trabalhador encontrado", 404);
    }

    return workers_services;
  }

  async activate(dto: ActivateWorkerDTO) {
    const worker = await this.workerRepository.findByEmail(dto.email);
      
    if (!worker) throw new AppError("Trabalhador não encontrado!", 404);

    if (worker.activationCode !== dto.code) {
      throw new AppError("Código de ativação inválido!", 400);
    }

    await this.workerRepository.updateActivation(worker.id, true);
  }
  
}
