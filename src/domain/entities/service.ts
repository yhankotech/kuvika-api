export class Service {
  constructor(
    public readonly id: string,
    public clientId: string,
    public workerId: string,
    public serviceDate: Date,
    public description: string,
    public status: string,
    public readonly createdAt: Date,
  ){}
}