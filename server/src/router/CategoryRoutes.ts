import CategoryController from "../controller/CategoryController";
import validate from "../helpers/validate";
import auth from "../middleware/auth";
import { createCategory, updateCategory } from "../schema/CategorySchema";
import { catchAsync } from "../utils/catchAsync";
import BaseRoutes from "./base/BaseRoutes";

export class CategoryRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post(
      "/",
      auth("admin"),
      validate(createCategory),
      catchAsync(CategoryController.create)
    );

    this.router.put(
      "/:id",
      auth("admin"),
      validate(updateCategory),
      catchAsync(CategoryController.update)
    );

    this.router.get("/:id", auth(), catchAsync(CategoryController.getById));

    this.router.get("/", auth(), catchAsync(CategoryController.getAll));

    this.router.delete(
      "/:id",
      auth("admin"),
      catchAsync(CategoryController.delete)
    );
  }
}

export default new CategoryRoutes().router;
