export interface CreateClientDTO {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  location: string;
}

export interface UpdateClientDTO {
  fullName?: string;
  email?: string;
  password?: string;
  phone?: string;
  location?: string;
}

export interface GetClientByIdDTO {
  id: string;
}

export interface GetClientByEmailDTO {
  email: string;
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
  createdAt: Date;
}


export interface LoginClientDTO {
  email: string,
  password: string
};

