export class Rating {
  constructor(
    public readonly id: string,
    public readonly clientId: string,
    public readonly workerId: string,
    public readonly serviceRequestId: string,
    public readonly score: number,
    public readonly comment: string,
    public readonly createdAt: Date
  ) {}
}