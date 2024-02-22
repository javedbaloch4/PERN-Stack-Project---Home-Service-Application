import { ApiForbidden, BadRequestError } from "../errors";
import { Category } from "../model/Category";
import { Review } from "../model/Review";
import { Service } from "../model/Service";
import { SERVICE_STATUS } from "../utils/common";

interface IServiceRepo {
  save(service: Service): Promise<Service>;
  update(service: Service): Promise<Service>;
  delete(id: number): Promise<Service>;
  getById(id: number): Promise<Service>;
  getAll(): Promise<Service[]>;
}

export class ServiceRepository implements IServiceRepo {
  async save(service: Service): Promise<Service> {
    const response = await Service.create({
      title: service.title,
      description: service.description,
      location: service.location,
      price: service.price,
      status: service.status,
      statusService: SERVICE_STATUS.PENDING,
      categoryId: service.categoryId,
      userId: service.userId,
    });

    const res = await this.getById(response.id);
    return res;
  }

  async update(service: Service): Promise<Service> {
    const res = await Service.findOne({
      where: { id: service.id },
      include: [{ model: Category, as: "category" }],
    });

    if (!res) {
      throw new BadRequestError("Service not found");
    }

    res.title = service.title;
    res.description = service.description;
    res.location = service.location;
    res.price = service.price;
    res.status = service.status;
    res.statusService = service.statusService;
    res.categoryId = service.categoryId;

    await res.save();
    await res.reload();

    return res;
  }

  async delete(id: number): Promise<Service> {
    const res = await Service.findOne({
      where: { id: id },
    });

    if (!res) {
      throw new BadRequestError("Service not found");
    }

    await res.destroy();

    return res;
  }

  async getById(id: number): Promise<Service> {
    const res = await Service.findOne({
      where: { id: id },
      include: [{ model: Category, as: "category" }],
    });

    if (!res) {
      throw new BadRequestError("Service not found");
    }

    return res;
  }

  async getAll(): Promise<Service[]> {
    try {
      const services = await Service.findAll({
        include: [
          { model: Category, as: "category" },
          { model: Review, as: "reviews" },
        ],
      });

      return services;
    } catch (err) {
      throw new ApiForbidden("Err " + err);
    }
  }
}
