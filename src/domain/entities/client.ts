export class Client {
  constructor(
    public readonly id: string,
    public fullName: string,
    public email: string,
    public password: string,
    public phone: string,
    public location: string,
    public createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}