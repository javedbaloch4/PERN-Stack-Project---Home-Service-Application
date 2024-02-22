import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
  HasMany,
} from "sequelize-typescript";
import { User } from "./User";
import { Category } from "./Category";
import { Review } from "./Review";
import { Booking } from "./Booking";
import { SERVICE_STATUS } from "../utils/common";

@Table({
  tableName: Service.SERVICE_TABLE_NAME,
})
export class Service extends Model {
  public static SERVICE_TABLE_NAME = "service";
  public static SERVICE_ID = "id";
  public static SERVICE_TITLE = "title";
  public static SERVICE_DESCRIPTION = "description";
  public static SERVICE_LOCATION = "location";
  public static SERVICE_PRICE = "price";
  public static SERVICE_STATUS = "status";
  public static SERVICE_STATUS_SERVICE = "statusService";
  public static SERVICE_COMMENT = "comment";
  public static SEARVICE_UUID = "uuid";
  public static SERVICE_USER_ID = "userId";
  public static SERVICE_CATEGORY_ID = "categoryId";

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Service.SERVICE_ID,
  })
  id!: number;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  uuid!: string;

  @Column({
    type: DataType.STRING,
    field: Service.SERVICE_TITLE,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    field: Service.SERVICE_DESCRIPTION,
  })
  description!: string;

  @Column({
    type: DataType.STRING,
    field: Service.SERVICE_LOCATION,
  })
  location!: string;

  @Column({
    type: DataType.FLOAT(8, 2),
    field: Service.SERVICE_PRICE,
  })
  price!: string;

  @Column({
    type: DataType.STRING,
    defaultValue: "",
    field: Service.SERVICE_COMMENT,
  })
  comment!: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(SERVICE_STATUS),
    field: Service.SERVICE_STATUS_SERVICE,
  })
  statusService!: SERVICE_STATUS;

  @Column({
    type: DataType.BOOLEAN,
    field: Service.SERVICE_STATUS,
  })
  status!: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: Service.SERVICE_USER_ID,
  })
  userId!: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    field: Service.SERVICE_CATEGORY_ID,
  })
  categoryId!: string;

  // Associations
  @BelongsTo(() => Category)
  category!: Category;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Review, {
    onDelete: "CASCADE",
    foreignKey: "serviceId",
    hooks: true,
  })
  reviews!: Review[];

  @HasMany(() => Booking, {
    onDelete: "CASCADE",
    foreignKey: "serviceId",
  })
  bookings!: Booking[];
}
