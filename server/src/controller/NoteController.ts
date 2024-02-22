import { Request, Response } from "express";
import { Note } from "../model/Note";
import { NoteRepository } from "../repository/NotesRepository";

class NoteController {
  async create(req: Request, res: Response) {
    const newNote = new Note();
    newNote.name = req.body.name;
    newNote.description = req.body.name;

    await new NoteRepository().save(newNote);

    res.status(201).json({
      status: "created",
      message: "Successfully created note",
    });
  }

  async update(req: Request, res: Response) {
    try {
      let { id } = req.params;
      const newNote = new Note();

      newNote.id = parseInt(id);
      newNote.name = req.body.name;
      newNote.description = req.body.description;

      await new NoteRepository().update(newNote);

      res.status(200).json({
        status: "updated",
        message: "Successfully updated note",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server error",
        message: err,
      });
    }
  }

  async delete(req: Request, res: Response) {
    let { id } = req.params;

    await new NoteRepository().delete(parseInt(id));

    res.status(200).json({
      status: "deleted",
      message: "Successfully deleted note",
    });
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const note = await new NoteRepository().getById(parseInt(id));

    res.status(200).json({
      status: "Ok!",
      message: "Successfully fetched note by id",
      data: note,
    });
  }

  async getAll(req: Request, res: Response) {
    const notes = await new NoteRepository().getAll();

    res.status(200).json({
      status: "Ok!",
      message: "Successfully fetchteda all notes",
      data: notes,
    });
  }
}

export default new NoteController();
