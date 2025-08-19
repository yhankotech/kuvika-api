import { Request, Response } from "express";
import { makeService } from "@/interfaces/factory/serviceFactory";
import { AppError } from "@/shared/errors/error";
import z from "zod";

const createClientSchema = z.object({
    workerId: z.string().uuid(),
    serviceDate: z.coerce.date({
        required_error: "A data do serviço é obrigatória",
        invalid_type_error: "Formato de data inválido",
    }),
    description: z.string(),
    status: z.enum(["aceito", "rejeitado", "Pendente"]).default('Pendente'),
});

const idClientSchema = z.object({
    clientId: z.string().uuid(),
});

const idWorkerSchema = z.object({
    workerId: z.string().uuid(),
});

const idSchema = z.object({
    id: z.string().uuid(),
});

const statusSchema = z.object({
    status: z.enum(["aceito", "rejeitado", "Pendente"]).default('Pendente'),
});

export class ServiceRequestController {
  async create(req: Request, response: Response) {

    try {
        const { clientId } = idClientSchema.parse(req.params);
        const {  workerId, serviceDate, description, status } = createClientSchema.parse(req.body);

        const service = makeService()

        const request = await service.create({
        clientId,
        workerId,
        serviceDate: new Date(serviceDate),
        description,
        status,
        });

        if(!request) throw new AppError("Cliente não existe!",404)

        return response.status(201).json(request);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return response.status(400).json({ error: 'Erro de validação', details: error.errors });
        }

        if(error instanceof AppError){
            return response.status(400).json({error: "Alguma coisa deu errado!"})
        }
    }
  }

  async getByClient(request: Request, response: Response) {
   try {
        const { clientId } = idClientSchema.parse(request.params);
        
        const service = makeService()

        const requests = await service.clientList(clientId);

        return response.status(200).json(requests);

   } catch (error) {
        if(error instanceof AppError){
            return response.status(404).json({error: "Cliente não existe!"})
        }
    }
  }

  async getByWorker(request: Request, response: Response) {
    try {
          const { workerId } = idWorkerSchema.parse(request.params);
   
        const service = makeService()

        const requests = await service.workerList(workerId);

        return response.status(200).json(requests);

    } catch (error) {
        if(error instanceof AppError){
            return response.status(404).json({error: "Trabalhador não existe!"})
        }
    }
  }

  async updateStatus(request: Request, response: Response) {
    try {
        const { id } = idSchema.parse(request.params);
        const { status } = statusSchema.parse(request.body);

        if (status !== "aceito" && status !== "rejeitado") {
            return response.status(400).json({ error: 'Status deve ser "aceito" ou "rejeitado"' });
        }
    
        const service = makeService()

        const updated = await service.updateRequestStatus(id, status);
        return response.status(200).json(updated);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return response.status(400).json({ error: 'Erro de validação', details: error.errors });
        }

        if(error instanceof AppError){
            return response.status(404).json({error: "Solicitação de serviço não existe!"})
        }

        if(error instanceof AppError){
            return response.status(400).json({error: "Alguma coisa deu errado!"})
        }
    }
  }

  async deleteService(request: Request, response: Response) {
    try {
        const { id } = idSchema.parse(request.params);
    
        const service = makeService()

        const updated = await service.deleteServiceRequest(id);
        return response.status(200).json(updated);

    } catch (error) {
        if(error instanceof AppError){
            return response.status(404).json({error: "Solicitação de serviço não existe!"})
        }

        if(error instanceof AppError){
            return response.status(400).json({error: "Alguma coisa deu errado!"})
        }
    }
  }
}