import express, { Application, Request, Response } from "express";
import Database from "./config/database";
import NotesRoutes from "./router/NotesRouter";
import UserRoutes from "./router/UserRoutes";
import CategoryRoutes from "./router/CategoryRoutes";
import ReviewRoutes from "./router/ReviewRoutes";
import ServiceRoutes from "./router/ServiceRoutes";
import BookingRoutes from "./router/BookingRoutes";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import jwtStrategy from "./config/passport";

import passport from "passport";
import PaymentRoutes from "./router/PaymentRoutes";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.databaseSync();
    this.routes();
    passport.use("jwt", jwtStrategy);
  }

  protected databaseSync(): void {
    const db = new Database();
    db.sequelize?.sync();
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      return res.send("Welcome home");
    });
    this.app.use("/api/notes", NotesRoutes);
    this.app.use("/api/auth/", UserRoutes);
    this.app.use("/api/category", CategoryRoutes);
    this.app.use("/api/review", ReviewRoutes);
    this.app.use("/api/service", ServiceRoutes);
    this.app.use("/api/booking", BookingRoutes);
    this.app.use("/api/payment", PaymentRoutes);
  }
}

const port: number = Number(process.env.NODE_LOCAL_PORT);

const app = new App().app;

app.use(errorHandler);

app.listen(port, () => {
  console.log(`✅ App is running on port ${port}`);
});
