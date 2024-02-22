import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { ROLE } from "../utils/common";
import { Booking } from "./Booking";
import { Service } from "./Service";
import { Review } from "./Review";

@Table({
  tableName: User.USER_TABLE_NAME,
})
export class User extends Model {
  public static USER_TABLE_NAME = "users";
  public static USER_ID = "id";
  public static USER_NAME = "name";
  public static USER_EMAIL = "email";
  public static USER_PASSWORD = "password";
  public static USER_ROLE = "role";
  public static USER_STATUS = "status";
  public static USER_GENDER = "gender";
  public static USER_AGE = "age";
  public static USER_VERIFICATION_TOKEN = "userVerificationToken";
  public static USER_LOGIN_ATTEMPS = "loginAttempts";
  public static USER_LAST_LOGIN_ATTEMPT = "lastLoginAttempt";

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: User.USER_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    field: User.USER_NAME,
  })
  name!: string;

  @Column({
    type: DataType.STRING(100),
    field: User.USER_EMAIL,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING(100),
    field: User.USER_PASSWORD,
  })
  password!: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(ROLE),
    field: User.USER_ROLE,
  })
  role!: ROLE;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    field: User.USER_STATUS,
  })
  status!: Boolean;

  @Column({
    type: DataType.STRING,
    field: User.USER_GENDER,
  })
  gender!: string;

  @Column({
    type: DataType.INTEGER,
    field: User.USER_LOGIN_ATTEMPS,
    defaultValue: 0,
  })
  loginAttempts!: number;

  @Column({
    type: DataType.DATE,
    field: User.USER_LAST_LOGIN_ATTEMPT,
  })
  lastLoginAttempt!: Date | null;

  @Column({
    type: DataType.INTEGER,
    field: User.USER_AGE,
  })
  age!: number;

  @Column({
    type: DataType.STRING,
    field: User.USER_VERIFICATION_TOKEN,
  })
  userVerificationToken!: string;

  // Associations
  @HasMany(() => Booking, {
    onDelete: "CASCADE",
    foreignKey: "userId",
  })
  bookings!: Booking[];

  @HasMany(() => Service, {
    onDelete: "CASCADE",
    foreignKey: "userId",
  })
  service!: Service[];

  @HasMany(() => Review, {
    onDelete: "CASCADE",
  })
  reviews!: Review;
}
