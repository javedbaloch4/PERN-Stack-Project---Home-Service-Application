import { Request, Response } from "express";
import { BookingRepository } from "../repository/BookingRepository";
import { Booking, PaymentStatus } from "../model/Booking";
const stripe = require("stripe")(
  "sk_test_51OaobeCSUikO3UCecix849oMpFV1K531wmJAhGMLjfIQU8hJbI3oqA4mPWH3ekkpkHM7U2f0LUazQU8cQsOKte7K00gwE6agQP"
);

class PaymentController {
  async pay(req: Request, res: Response) {
    console.log("It has been hitt.");

    const { amount, serviceId, userId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    const booking = new Booking();

    booking.bookingDate = new Date();
    booking.paymentStatus = PaymentStatus.COMPLETED;
    booking.serviceId = serviceId;
    booking.userId = userId;

    const response = await new BookingRepository().save(booking);

    console.log("Payment Intent", paymentIntent);
    console.log("Repo response", response);

    res.json({ clientSecret: paymentIntent.client_secret });
  }
}

export default new PaymentController();
