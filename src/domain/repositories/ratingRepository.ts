import { Rating } from "@/domain/entities/rating";
import { RatingDTO } from "@/http/dtos/ratingDto";

export interface RatingRepository {
  create(data: RatingDTO): Promise<Rating>;
  findByWorkerId(workerId: string): Promise<Rating[]>;
  getAverageRatingByWorker(workerId: string): Promise<number | null>
}