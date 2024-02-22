import BookingController from "../controller/BookingController";
import validate from "../helpers/validate";
import auth from "../middleware/auth";
import { createBooking, updateBooking } from "../schema/BookingSchema";
import { catchAsync } from "../utils/catchAsync";
import BaseRoutes from "./base/BaseRoutes";

export class BookingRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post(
      "/",
      auth("admin"),
      validate(createBooking),
      catchAsync(BookingController.create)
    );

    this.router.put(
      "/:id",
      auth("admin"),
      validate(updateBooking),
      catchAsync(BookingController.update)
    );

    this.router.get(
      "/:id",
      auth("admin"),
      catchAsync(BookingController.getById)
    );

    this.router.get("/", auth("admin"), catchAsync(BookingController.getAll));

    this.router.delete(
      "/:id",
      auth("admin"),
      catchAsync(BookingController.delete)
    );
  }
}

export default new BookingRoutes().router;
