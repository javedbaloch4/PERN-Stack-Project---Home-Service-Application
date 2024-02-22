import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Service } from "./Service";
import { User } from "./User";
import { Review } from "./Review";

export enum PaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  CANCELED = "canceled",
}

export enum BookingStatus {
  PENDING = "pending",
  COMPLETED = "completed",
}

@Table({
  tableName: Booking.BOOKING_TABLE_NAME,
})
export class Booking extends Model {
  public static BOOKING_TABLE_NAME = "bookings";
  public static BOOKING_TABLE_ID = "id";
  public static BOOKING_BOOKING_DATE = "bookingDate";
  public static BOOKING_PAYMENT_STATUS = "paymentStatus";
  public static BOOKING_COMPLETE_STATUS = "completeStatus";
  public static BOOKING_SERVICE_ID = "serviceId";
  public static BOOKING_USER_ID = "userId";

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Booking.BOOKING_TABLE_ID,
  })
  id!: number;

  @Column({
    type: DataType.DATE,
    field: Booking.BOOKING_BOOKING_DATE,
  })
  bookingDate!: Date;

  @Column({
    type: DataType.ENUM,
    values: Object.values(PaymentStatus),
    field: Booking.BOOKING_PAYMENT_STATUS,
  })
  paymentStatus!: PaymentStatus;

  @Column({
    type: DataType.ENUM,
    values: Object.values(BookingStatus),
    defaultValue: BookingStatus.PENDING,
    field: Booking.BOOKING_COMPLETE_STATUS,
  })
  completeStatus!: BookingStatus;

  @ForeignKey(() => Service)
  @Column({
    type: DataType.INTEGER,
    field: Booking.BOOKING_SERVICE_ID,
  })
  serviceId!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: Booking.BOOKING_USER_ID,
  })
  userId!: number;

  @BelongsTo(() => Service, {
    foreignKey: Booking.BOOKING_SERVICE_ID,
  })
  service!: Service;

  @BelongsTo(() => User, {
    foreignKey: Booking.BOOKING_USER_ID,
  })
  user!: User;
}
