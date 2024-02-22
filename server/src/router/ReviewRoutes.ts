import ReviewController from "../controller/ReviewController";
import validate from "../helpers/validate";
import auth from "../middleware/auth";
import { createReview, updateReview } from "../schema/ReviewSchema";
import { catchAsync } from "../utils/catchAsync";
import BaseRoutes from "./base/BaseRoutes";

export class ReviewRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post(
      "/",
      auth("customer"),
      validate(createReview),
      catchAsync(ReviewController.save)
    );

    this.router.put(
      "/:id",
      auth("customer"),
      validate(updateReview),
      catchAsync(ReviewController.update)
    );

    this.router.get(
      "/:id",
      auth("customer"),
      catchAsync(ReviewController.getById)
    );

    this.router.get("/", auth("customer"), catchAsync(ReviewController.getAll));

    this.router.delete(
      "/:id",
      auth("customer"),
      catchAsync(ReviewController.delete)
    );
  }
}

export default new ReviewRoutes().router;
