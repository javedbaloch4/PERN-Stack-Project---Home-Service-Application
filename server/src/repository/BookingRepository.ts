import { BadRequestError } from "../errors";
import { Booking } from "../model/Booking";
import { Review } from "../model/Review";
import { Service } from "../model/Service";
import { User } from "../model/User";

interface IBookingRepo {
  save(booking: Booking): Promise<Booking>;
  update(booking: Booking): Promise<Booking>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<Booking>;
  getAll(): Promise<Booking[]>;
}

export class BookingRepository implements IBookingRepo {
  async save(booking: Booking): Promise<Booking> {
    const response = await Booking.create({
      bookingDate: new Date(booking.bookingDate),
      paymentStatus: booking.paymentStatus,
      serviceId: booking.serviceId,
      userId: booking.userId,
    });
    return response;
  }

  async update(booking: Booking): Promise<Booking> {
    const res = await Booking.findOne({
      where: { id: booking.id },
      include: [
        { model: Service, as: "service" },
        { model: User, as: "user" },
      ],
    });

    if (!res) {
      throw new BadRequestError("Booking not found");
    }

    res.bookingDate = booking.bookingDate;
    res.paymentStatus = booking.paymentStatus;
    res.completeStatus = booking.completeStatus;
    res.serviceId = booking.serviceId;

    await res.save();
    await res.reload();

    return res;
  }

  async delete(id: number): Promise<void> {
    const deletedBooking = await Booking.findOne({
      where: { id: id },
    });

    if (!deletedBooking) {
      throw new Error("Booking not found");
    }

    await deletedBooking.destroy();
  }

  async getById(bookingId: number): Promise<Booking> {
    const response = await Booking.findOne({
      where: { id: bookingId },
      include: [
        { model: Service, as: "service" },
        { model: User, as: "user" },
      ],
    });

    if (!response) {
      throw new Error("Booking not found");
    }

    return response;
  }

  async getAll(): Promise<Booking[]> {
    try {
      console.log("Get all bookings S#1");
      const response = await Booking.findAll({
        include: [
          { model: Service, as: "service" },
          { model: User, as: "user" },
        ],
      });
      console.log("Get all bookings S#2");

      return response;
    } catch (err) {
      console.log(err);
      throw new Error("Error " + err);
    }
  }
}

export default new BookingRepository();
