import { Request, Response } from "express";
import z from "zod";
import { makeRatingService } from "../factory/ratingFactory";
import { ResourceNotFoundError } from "../../shared/errors/error";

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
  async create(req: Request, res: Response) {
    try {
      const data = createRatingSchema.parse(req.body);

      const service = makeRatingService();
      const rating = await service.create(data);

      return res.status(201).json(rating);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Erro de validação", details: error.errors });
      }
      return res.status(500).json({ error: "Erro ao registrar avaliação" });
    }
  }

  async getByWorker(req: Request, res: Response) {
    try {
      const { workerId } = workerIdSchema.parse(req.params);

      const service = makeRatingService();
      const ratings = await service.getWorkerRatings(workerId);

      return res.status(200).json(ratings);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ error: "Trabalhador sem avaliações" });
      }
      return res.status(500).json({ error: "Erro ao buscar avaliações" });
    }
  }
}