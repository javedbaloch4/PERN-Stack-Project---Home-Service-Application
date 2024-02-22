import ServiceController from "../controller/ServiceController";
import validate from "../helpers/validate";
import auth from "../middleware/auth";
import { createService, updateService } from "../schema/ServiceSchema";
import { catchAsync } from "../utils/catchAsync";
import BaseRoutes from "./base/BaseRoutes";

export class ServiceRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post(
      "/",
      auth("admin"),
      validate(createService),
      catchAsync(ServiceController.save)
    );

    this.router.put(
      "/:id",
      auth("admin"),
      validate(updateService),
      catchAsync(ServiceController.update)
    );

    this.router.get(
      "/:id",
      auth("admin"),
      catchAsync(ServiceController.getById)
    );

    this.router.get("/", auth("admin"), catchAsync(ServiceController.getAll));

    this.router.delete(
      "/:id",
      auth("admin"),
      catchAsync(ServiceController.delete)
    );
  }
}

export default new ServiceRoutes().router;
