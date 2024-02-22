import NoteController from "../controller/NoteController";
import validate from "../helpers/validate";
import auth from "../middleware/auth";
import { createNotesSchema, updateNotesSchema } from "../schema/NotesSchema";
import { catchAsync } from "../utils/catchAsync";
import BaseRoutes from "./base/BaseRoutes";

export class NotesRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post(
      "/",
      validate(createNotesSchema),
      catchAsync(NoteController.create)
    );
    this.router.patch(
      "/:id",
      validate(updateNotesSchema),
      catchAsync(NoteController.update)
    );
    this.router.delete("/:id", catchAsync(NoteController.delete));
    this.router.get("/", auth("admin"), catchAsync(NoteController.getAll));
    this.router.get("/:id", catchAsync(NoteController.getById));
  }
}

export default new NotesRoutes().router;
