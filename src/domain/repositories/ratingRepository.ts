import { Rating } from "../entities/rating";
import { RatingDTO } from "../../interfaces/dtos/ratingDto";

export interface RatingRepository {
  create(data: RatingDTO): Promise<Rating>;
  findByWorkerId(workerId: string): Promise<Rating[]>;
  getAverageRatingByWorker(workerId: string): Promise<number | null>
}