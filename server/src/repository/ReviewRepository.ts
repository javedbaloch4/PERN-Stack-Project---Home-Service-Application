import { Review } from "../model/Review";

interface IReviewrepo {
  save(review: Review): Promise<void>;
  update(review: Review): Promise<void>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<Review>;
  getAll(): Promise<Review[]>;
}

export class ReviewRepository implements IReviewrepo {
  async save(review: Review): Promise<void> {
    try {
      await Review.create({
        rating: review.rating,
        comment: review.comment,
        serviceId: review.serviceId,
        userId: review.userId,
      });
    } catch (err) {
      throw new Error("Failed to save review " + err);
    }
  }

  async update(review: Review): Promise<void> {
    try {
      const res = await Review.findOne({
        where: { id: review.id },
      });

      if (!res) {
        throw new Error("Review not found");
      }

      res.rating = review.rating;
      res.comment = review.comment;
      await res.save();
    } catch (err) {
      throw new Error("Failed to update review" + err);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const res = await Review.findOne({
        where: { id: id },
      });

      if (!res) {
        throw new Error("Review not found");
      }

      await res.destroy();
    } catch (err) {
      throw new Error("Failed to delete review");
    }
  }

  async getById(id: number): Promise<Review> {
    try {
      const res = await Review.findOne({
        where: { id: id },
      });

      if (!res) {
        throw new Error("Review not found");
      }

      return res;
    } catch (err) {
      throw new Error("Failed to fetch review");
    }
  }

  async getAll(): Promise<Review[]> {
    try {
      return await Review.findAll();
    } catch (err) {
      throw new Error("Failed to fetch reviews");
    }
  }
}
