import { Request, Response } from "express";
import { Booking } from "../model/Booking";
import { BookingRepository } from "../repository/BookingRepository";

class BookingController {
  async create(req: Request, res: Response) {
    const booking = new Booking();

    booking.bookingDate = req.body.bookingDate;
    booking.paymentStatus = req.body.paymentStatus;
    booking.serviceId = req.body.serviceId;
    booking.userId = req.body.userId;

    const response = await new BookingRepository().save(booking);

    res.status(201).json({
      status: "created",
      message: "Successfully created booking",
      data: response,
    });
  }

  async update(req: Request, res: Response) {
    let { id } = req.params;
    const booking = new Booking();

    booking.id = parseInt(id);
    booking.bookingDate = req.body.bookingDate;
    booking.paymentStatus = req.body.paymentStatus;
    booking.serviceId = req.body.serviceId;
    booking.completeStatus = req.body.completeStatus;

    const response = await new BookingRepository().update(booking);

    res.status(201).json({
      status: "updated",
      message: "Successfully updated booking",
      data: response,
    });
  }

  async delete(req: Request, res: Response) {
    let { id } = req.params;
    await new BookingRepository().delete(parseInt(id));

    res.status(201).json({
      status: "deleted",
      message: "Successfully deleted booking",
    });
  }

  async getById(req: Request, res: Response) {
    let { id } = req.params;
    const response = await new BookingRepository().getById(parseInt(id));

    res.status(200).json({
      status: "Ok!",
      message: "Successfully fetched booking by id",
      data: response,
    });
  }

  async getAll(req: Request, res: Response) {
    const response = await new BookingRepository().getAll();

    res.status(200).json({
      status: "ok!",
      data: response,
    });
  }
}

export default new BookingController();
