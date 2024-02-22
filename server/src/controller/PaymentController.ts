import { Request, Response } from "express";
import { BookingRepository } from "../repository/BookingRepository";
import { Booking, PaymentStatus } from "../model/Booking";
const stripe = require("stripe")(
  "stripeKey"
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
