import { prisma } from "../database/prisma";
import { RatingDTO } from "../../interfaces/dtos/ratingDto";
import { Rating } from "../../domain/entities/rating";
import { RatingRepository } from "../../domain/repositories/ratingRepository";
import { randomUUID } from "crypto";

export class PrismaRatingRepository implements RatingRepository {
    private connect = prisma;

  async create(data: RatingDTO): Promise<Rating> {
    const result = await this.connect.rating.create({
      data: {
        id: randomUUID(),
        ...data,
        createdAt: new Date(),
      },
    });

    return new Rating(
      result.id,
      result.clientId,
      result.workerId,
      result.score,
      result.comment ?? "",
      result.createdAt
    );
  }

  async findByWorkerId(workerId: string): Promise<Rating[]> {
    const results = await this.connect.rating.findMany({
      where: { workerId },
    });

    return results.map(
      (r) =>
        new Rating(
          r.id,
          r.clientId,
          r.workerId,
          r.score,
          r.comment ?? "",
          r.createdAt
        )
    );
  }

  async getAverageRatingByWorker(workerId: string): Promise<number | null> {
    const result = await this.connect.rating.aggregate({
      _avg: {
        score: true,
      },
      where: {
        workerId,
      },
    });

    return result._avg.score ?? null;
  }
}
