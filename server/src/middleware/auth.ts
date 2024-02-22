import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { ApiForbidden, NotAuthorizeError } from "../errors";

// import { roleRepository } from "../repository";

type Promolve<ResT = void, RejT = Error> = {
  promise: Promise<ResT>;
  resolve: (value: ResT | PromiseLike<ResT>) => void;
  reject: (value: RejT) => void;
};
const verifyCallback =
  (
    req: Request,
    res: Response,
    resolve: Promolve["resolve"],
    reject: Promolve["reject"],
    requiredRights: string[]
  ) =>
  async (err: Error, user: any, info: any) => {
    if (err || info || !user) {
      return reject(new NotAuthorizeError());
    }

    req.user = user;

    if (requiredRights.length) {
      const roles = ["seller", "customer", "admin"];

      if (!roles.includes(user.role)) {
        return reject(new ApiForbidden());
      }
    }
    resolve();
  };

const auth =
  (...requiredRights: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return new Promise(
      (resolve: Promolve["resolve"], reject: Promolve["reject"]) => {
        passport.authenticate(
          "jwt",
          { session: false },
          verifyCallback(req, res, resolve, reject, requiredRights)
        )(req, res, next);
      }
    )
      .then(() => next())
      .catch((err) => next(err));
  };

export default auth;
