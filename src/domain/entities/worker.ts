
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
    public readonly createdAt: Date
  ) {}
}

export class WorkerSearch {
  constructor(
    public readonly id: string,
    public readonly fullName: string,
    public readonly email: string,
    public readonly phoneNumber: string,
    public readonly location: string,
    public readonly serviceTypes: string[],
    public readonly averageRating: number,
    public readonly description: string | null,
  ) {}
}