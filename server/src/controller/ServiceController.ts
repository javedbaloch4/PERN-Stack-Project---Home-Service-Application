import { Request, Response } from "express";
import { Service } from "../model/Service";
import { ServiceRepository } from "../repository/ServiceRepository";
import { SERVICE_STATUS } from "../utils/common";

export class ServiceController {
  async save(req: Request, res: Response) {
    const service = new Service();

    service.title = req.body.title;
    service.description = req.body.description;
    service.location = req.body.location;
    service.price = req.body.price;
    service.status = req.body.status;
    service.statusService = SERVICE_STATUS.PENDING;
    service.categoryId = req.body.categoryId;
    service.userId = req.body.userId;

    const response = await new ServiceRepository().save(service);

    res.status(201).json({
      status: "created",
      message: "Successfully created service",
      data: response,
    });
  }

  async update(req: Request, res: Response) {
    let { id } = req.params;
    const service = new Service();

    service.id = parseInt(id);

    service.title = req.body.title;
    service.description = req.body.description;
    service.location = req.body.location;
    service.price = req.body.price;
    service.status = req.body.status;
    service.statusService = req.body.statusService;
    service.categoryId = req.body.categoryId;

    const response = await new ServiceRepository().update(service);

    res.status(201).json({
      status: "Updated",
      message: "Successfully updated the service",
      data: response,
    });
  }

  async delete(req: Request, res: Response) {
    let { id } = req.params;
    const response = await new ServiceRepository().delete(parseInt(id));

    res.status(201).json({
      status: "deleted",
      message: "Successfully deleted service",
      data: response,
    });
  }

  async getById(req: Request, res: Response) {
    let { id } = req.params;
    const response = await new ServiceRepository().getById(parseInt(id));

    res.status(200).json({
      status: "ok!",
      message: "Successfully fetched service by id",
      data: response,
    });
  }

  async getAll(req: Request, res: Response) {
    const response = await new ServiceRepository().getAll();
    console.log("RES", response);

    res.status(200).json({
      status: "ok!",
      message: "Successfully get all",
      data: response,
    });
  }
}

export default new ServiceController();
