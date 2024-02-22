import { User } from "../model/User";
import jwt from "jsonwebtoken";

export class JWT {
  public static encode(user: User): string {
    const options = {
      expiresIn: process.env.JWT_EXPIRE,
    };

    const payload = {
      userId: user.id,
      roles: user.role,
    };

    return jwt.sign(payload, process.env.JWT_SECRET!, options);
  }
}
