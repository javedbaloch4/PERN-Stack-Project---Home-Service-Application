import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (err: any) {
      console.error(err);

      if (err.errors) {
        const errorDetails = err.errors.map((error: any) => ({
          field: error.path[1],
          message: error.message,
        }));

        return res.status(400).json({
          status: "Bad Request",
          message: "Validation Error",
          details: errorDetails,
        });
      } else {
        // Handle other unexpected errors
        return res.status(500).json({
          status: "Internal Server Error",
          message: "Something went wrong. Please try again later.",
        });
      }
    }
  };

export default validate;
