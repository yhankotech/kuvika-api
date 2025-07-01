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