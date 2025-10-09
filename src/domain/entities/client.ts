export class Client {
  constructor(
    public readonly id: string,
    public fullName: string,
    public email: string,
    public password: string,
    public phone: string,
    public location: string,
    public avatar: string | undefined,
    public createdAt?: Date,
    public readonly updatedAt?: Date,
    public activationCode?: string | null,
    public isActive: boolean = false,
  ) {}
}