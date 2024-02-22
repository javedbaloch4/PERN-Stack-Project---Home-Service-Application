import { z } from "zod";
import { PaymentStatus } from "../model/Booking";

export const createBooking = z.object({
  body: z.object({
    bookingDate: z.string().min(1),
    paymentStatus: z.enum(Object.values(PaymentStatus) as any),
    serviceId: z.number().min(1),
    userId: z.number().min(1),
  }),
});

export const updateBooking = z.object({
  body: z.object({
    bookingDate: z.string().optional(),
    paymentStatus: z.enum(Object.values(PaymentStatus) as any).optional(),
    serviceId: z.number().min(1).optional(),
  }),
});
