import { RatingRepository} from "../../domain/repositories/ratingRepository";
import { Rating } from "../../domain/entities/rating";
import { ResourceNotFoundError } from "../../shared/errors/error";
import { RatingDTO } from "../../interfaces/dtos/ratingDto";
import { WorkerRepository } from "../../domain/repositories/workRepository";

export class RatingService {
  constructor(
      private readonly ratingRepository: RatingRepository,
      private workerRepository: WorkerRepository,
    ) {}

  async create(data: RatingDTO): Promise<Rating> {
    return this.ratingRepository.create({
      ...data,
    });
  }

  async getWorkerRatings(workerId: string): Promise<Rating[]> {
    const ratings = await this.ratingRepository.findByWorkerId(workerId);
    if (ratings.length === 0) {
      throw new ResourceNotFoundError();
    }
    return ratings;
  }

  async getAverageRatingByWorker(workerId: string) {
    const worker = await this.workerRepository.getById(workerId);

    if (!worker) {
      throw new ResourceNotFoundError();
    }

    const averageRating = await this.ratingRepository.getAverageRatingByWorker(workerId);

    return {
      ...worker,
      averageRating,
    };
  }

}