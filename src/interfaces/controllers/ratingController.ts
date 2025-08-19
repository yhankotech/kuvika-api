import { Request, Response } from "express";
import z from "zod";
import { makeRatingService } from "@/interfaces/factory/ratingFactory";
import { AppError } from "@/shared/errors/error";

const createRatingSchema = z.object({
  clientId: z.string().uuid(),
  workerId: z.string().uuid(),
  serviceRequestId: z.string().uuid(),
  score: z.number().min(1).max(5),
  comment: z.string().max(300),
});

const workerIdSchema = z.object({ 
    workerId: z.string().uuid() 
});

export class RatingController {
  async create(request: Request, response: Response) {
    try {
      const data = createRatingSchema.parse(request.body);

      const service = makeRatingService();
      const rating = await service.create(data);

      return response.status(201).json(rating);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return response.status(400).json({ error: "Erro de validação", details: error.errors });
      }
      return response.status(500).json({ error: "Erro ao registrar avaliação" });
    }
  }

  async getByWorker(request: Request, response: Response) {
    try {
      const { workerId } = workerIdSchema.parse(request.params);

      const service = makeRatingService();
      const ratings = await service.getWorkerRatings(workerId);

      return response.status(200).json(ratings);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(404).json({ error: "Trabalhador sem avaliações" });
      }

      throw new AppError("Erro ao buscar avaliações", 400);
    }
  }
}