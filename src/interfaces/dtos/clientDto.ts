export interface CreateClientDTO {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  avatar?: string | undefined;
}

export interface UpdateClientDTO {
  fullName?: string;
  email?: string;
  password?: string;
  phone?: string;
  location?: string;
  avatar?: string | undefined;
}

export interface GetClientByIdDTO {
  id: string;
}

export interface DeleteClientDTO {
  id: string;
}

export interface ReturnClientDTO {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  avatar?: string | undefined;
  createdAt: Date;
}


export interface LoginClientDTO {
  email: string,
  password: string
};

export interface ActivateClientDTO {
  email: string;
  code: string;
}