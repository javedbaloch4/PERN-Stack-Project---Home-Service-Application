import UserController from "../controller/UserController";
import validate from "../helpers/validate";
import { User } from "../model/User";
import { loginUser, registerUser } from "../schema/UserSchema";
import { catchAsync } from "../utils/catchAsync";
import BaseRoutes from "./base/BaseRoutes";

export class UserRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post(
      "/register",
      validate(registerUser),
      catchAsync(UserController.register)
    );

    this.router.post(
      "/login",
      validate(loginUser),
      catchAsync(UserController.login)
    );
  }
}

export default new UserRoutes().router;
