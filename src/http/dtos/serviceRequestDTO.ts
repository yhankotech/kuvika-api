export interface ServiceRequestDTO {
  clientId: string;
  workerId: string;
  serviceDate: Date;
  description: string;
  status?: string;
}