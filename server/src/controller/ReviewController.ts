import { Request, Response } from "express";
import { Review } from "../model/Review";
import { ReviewRepository } from "../repository/ReviewRepository";

export class ReviewController {
  async save(req: Request, res: Response) {
    const review = new Review();

    review.rating = parseInt(req.body.rating);
    review.comment = req.body.comment;
    review.userId = parseInt(req.body.userId);
    review.serviceId = parseInt(req.body.serviceId);

    await new ReviewRepository().save(review);

    res.status(201).json({
      status: "created",
      message: "Successfully created rating",
    });
  }

  async update(req: Request, res: Response) {
    let { id } = req.params;
    const review = new Review();

    review.id = parseInt(id);
    review.rating = req.body.rating;
    review.comment = req.body.comment;

    await new ReviewRepository().update(review);

    res.status(201).json({
      status: "Updated",
      message: "Successfully updated the review",
    });
  }

  async delete(req: Request, res: Response) {
    let { id } = req.params;
    await new ReviewRepository().delete(parseInt(id));

    res.status(201).json({
      status: "deleted",
      message: "Successfully deleted reivew",
    });
  }

  async getById(req: Request, res: Response) {
    let { id } = req.params;
    const review = await new ReviewRepository().getById(parseInt(id));

    res.status(200).json({
      status: "Ok!",
      message: "Successfully fetched review by id",
      data: review,
    });
  }

  async getAll(req: Request, res: Response) {
    const review = await new ReviewRepository().getAll();

    res.status(200).json({
      status: "ok!",
      data: review,
    });
  }
}

export default new ReviewController();
