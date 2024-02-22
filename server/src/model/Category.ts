import { HasMany, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { Service } from "./Service";

@Table({
  tableName: Category.CATEGORY_TABLE_NAME,
})
export class Category extends Model {
  public static CATEGORY_TABLE_NAME = "category";
  public static CATEGORY_TABLE_ID = "id";
  public static CATEGORY_NAME = "name";

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Category.CATEGORY_TABLE_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    field: Category.CATEGORY_TABLE_NAME,
  })
  name!: string;

  // Associations
  @HasMany(() => Service)
  services!: Service[];
}
