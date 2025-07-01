// src/domain/entities/Worker.ts
export class Worker {
  constructor(
    public readonly id: string,
    public fullName: string,
    public email: string,
    public password: string,
    public phoneNumber: string,
    public serviceTypes: string[],
    public location: string,
    public availability: string,
    public createdAt: Date
  ) {}
}