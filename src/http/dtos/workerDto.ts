export interface CreateWorkerDTO {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  serviceTypes: string[];
  location: string;
  avatar?: string | undefined;
  availability: string;
  municipality?: string;
  neighborhood?: string;
  profession?: string;
  experience?: number;
  birth_date?: Date;
  gender?: string;
}

export interface UpdateWorkerDTO {
  fullName?: string;
  phoneNumber?: string;
  serviceTypes?: string[];
  location?: string;
  avatar?: string | undefined;
  availability?: string;
  municipality?: string;
  neighborhood?: string;
  profession?: string;
  experience?: number;
  birth_date?: Date;
  gender?: string;
}

export interface ReturnWorkerDTO {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  serviceTypes: string[];
  location: string;
  avatar?: string | undefined;
  availability: string;
  municipality?: string;
  neighborhood?: string;
  profession?: string;
  experience?: number;
  gender?: string;
  createdAt: Date;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface ActivateWorkerDTO {
  email: string;
  code: string;
}

export interface UpdatePasswordDTO {
  email: string;
  currentPassword: string;
  newPassword: string;
  user_id: string;
}
