import { Request, Response } from "express";
import { Category } from "../model/Category";
import { CategoryRepository } from "../repository/CategoryRepository";

class CategoryController {
  async create(req: Request, res: Response) {
    const category = new Category();
    category.name = req.body.name;
    const response = await new CategoryRepository().save(category);

    res.status(201).json({
      status: "created",
      message: "Successfully created category",
      data: response,
    });
  }

  async update(req: Request, res: Response) {
    let { id } = req.params;
    const category = new Category();

    category.id = parseInt(id);
    category.name = req.body.name;

    const response = await new CategoryRepository().update(category);

    res.status(201).json({
      status: "updated",
      message: "Successfully updated category",
      data: response,
    });
  }

  async delete(req: Request, res: Response) {
    let { id } = req.params;
    const response = await new CategoryRepository().delete(parseInt(id));

    res.status(201).json({
      status: "deleted",
      message: "Successfully deleted category",
      data: response,
    });
  }

  async getById(req: Request, res: Response) {
    let { id } = req.params;
    const category = await new CategoryRepository().getById(parseInt(id));

    res.status(200).json({
      status: "Ok!",
      message: "Successfully fetched category by id",
      data: category,
    });
  }

  async getAll(req: Request, res: Response) {
    const categories = await new CategoryRepository().getAll();

    res.status(200).json({
      status: "ok!",
      data: categories,
    });
  }
}

export default new CategoryController();
