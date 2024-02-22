import { Category } from "../model/Category";
import { BadRequestError } from "../errors";

interface ICategoryRepo {
  save(category: Category): Promise<Category>;
  update(category: Category): Promise<Category>;
  delete(id: number): Promise<Category>;
  getById(id: number): Promise<Category>;
  getAll(id: number): Promise<Category[]>;
}

export class CategoryRepository implements ICategoryRepo {
  async save(category: Category): Promise<Category> {
    const res = await Category.create({
      name: category.name,
    });
    return res;
  }

  async update(category: Category): Promise<Category> {
    const newCategory = await Category.findOne({
      where: { id: category.id },
    });

    if (!newCategory) {
      throw new BadRequestError("Category not found");
    }

    newCategory.name = category.name;
    await newCategory.save();

    return newCategory;
  }

  async delete(id: number): Promise<Category> {
    const deletedCategory = await Category.findOne({
      where: { id: id },
    });

    if (!deletedCategory) {
      throw new BadRequestError("Category not found");
    }

    await deletedCategory.destroy();

    return deletedCategory;
  }

  async getById(noteId: number): Promise<Category> {
    const category = await Category.findOne({
      where: { id: noteId },
    });

    if (!category) {
      throw new BadRequestError("Category not found");
    }

    return category;
  }

  async getAll(): Promise<Category[]> {
    const categoires = await Category.findAll();
    return categoires;
  }
}

export default new CategoryRepository();
