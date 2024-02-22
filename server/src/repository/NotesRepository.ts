import { Note } from "../model/Note";

interface INoteRepo {
  save(note: Note): Promise<void>;
  update(note: Note): Promise<void>;
  delete(noteId: number): Promise<void>;
  getById(noteId: number): Promise<Note>;
  getAll(): Promise<Note[]>;
}

export class NoteRepository implements INoteRepo {
  async save(note: Note): Promise<void> {
    try {
      await Note.create({
        name: note.name,
        description: note.description,
      });
    } catch (err) {
      throw new Error("Failed to create note!");
    }
  }

  async update(note: Note): Promise<void> {
    try {
      const newNote = await Note.findOne({
        where: { id: note.id },
      });

      if (!newNote) {
        throw new Error("Note not found!");
      }

      newNote.name = note.name;
      newNote.description = note.description;
      await newNote.save();
    } catch (err) {
      throw new Error("Failed to update note!");
    }
  }

  async delete(noteId: number): Promise<void> {
    try {
      const newNote = await Note.findOne({
        where: { id: noteId },
      });

      if (!newNote) {
        throw new Error("Note not found!");
      }

      console.log("Last note");

      await newNote.destroy();
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Something went wrong on server"
      );
    }
  }

  async getById(noteId: number): Promise<Note> {
    try {
      const newNote = await Note.findOne({
        where: { id: noteId },
      });

      if (!newNote) {
        throw new Error("Note not found!");
      }

      return newNote;
    } catch (err) {
      throw new Error("Failed to find note!");
    }
  }

  getAll = async (): Promise<Note[]> => {
    try {
      const notes = await Note.findAll();
      return notes;
    } catch (err) {
      throw new Error("Failed to retrive notes");
    }
  };
}
