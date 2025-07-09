// src/application/dtos/CreateWorkerDTO.ts
export interface CreateWorkerDTO {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  serviceTypes: string[];
  location: string;
  availability: string;
}

export interface UpdateWorkerDTO {
  fullName?: string;
  phoneNumber?: string;
  serviceTypes?: string[];
  location?: string;
  availability?: string;
}

export interface ReturnWorkerDTO {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  serviceTypes: string[];
  location: string;
  availability: string;
  createdAt: Date;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface SearchWorkersDTO {
  location?: string;          // cidade ou bairro
  serviceType?: string;       // ex: eletricista, pintor
  minRating?: number;         // ex: 4
}