import PaymentController from "../controller/PaymentController";
import { catchAsync } from "../utils/catchAsync";
import BaseRoutes from "./base/BaseRoutes";

export class UserRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post(
      "/create-payment-intent",
      catchAsync(PaymentController.pay)
    );
  }
}

export default new UserRoutes().router;
