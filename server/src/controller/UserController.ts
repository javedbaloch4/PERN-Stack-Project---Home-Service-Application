import { Request, Response } from "express";
import { User } from "../model/User";
import { UserRepository } from "../repository/UserRepository";
import { JWT } from "../utils/JWT";

class UserController {
  async register(req: Request, res: Response) {
    const { name, email, password, role, age, gender } = req.body;
    const user = new User();
    user.name = name;
    user.password = password;
    user.email = email;
    user.role = role;
    user.age = age;
    user.gender = gender;

    console.log("h1");

    await new UserRepository().register(user);

    res.status(201).json({
      status: "created",
      message: "User registered succesfully!s",
    });
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await new UserRepository().login({ email, password });

    const token = JWT.encode(user);

    res.status(200).json({
      status: "loggedin",
      message: "User logged in successfully!",
      data: user,
      token: token,
    });
  }

  verify(req: Request, res: Response) {
    const token = req.query.token;

    // Find the user with the matching verification token
    const users: any = [];
    const user = users.find((u: any) => u.verificationToken === token);

    if (user) {
      // Mark the user as verified (you can update your database here)
      user.verified = true;
      res.send("Email verified successfully.");
    } else {
      res.send("Invalid verification token.");
    }
  }
}

export default new UserController();
