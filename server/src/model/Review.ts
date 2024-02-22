import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Service } from "./Service";
import { User } from "./User";

@Table({
  tableName: Review.REIVEW_TABLE_NAME,
})
export class Review extends Model {
  public static REIVEW_TABLE_NAME = "reviews";
  public static REIVEW_TABLE_ID = "id";
  public static REIVEW_RATING = "rating";
  public static REIVEW_COMMENT = "comment";
  public static REIVEW_SERVICE_ID = "serviceId";
  public static REIVEW_USER_ID = "userId";

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Review.REIVEW_TABLE_ID,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    field: Review.REIVEW_RATING,
  })
  rating!: number;

  @Column({
    type: DataType.STRING,
    field: Review.REIVEW_COMMENT,
  })
  comment!: string;

  @ForeignKey(() => Service)
  @Column({
    type: DataType.INTEGER,
    field: Review.REIVEW_SERVICE_ID,
  })
  serviceId!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: Review.REIVEW_USER_ID,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Service)
  service!: Service;
}
