import {
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "tbl_messages",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
})
class Message extends Model {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  public id!: number;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    unique: true,
    field: "unique_id",
  })
  public uniqueId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "sender_id",
  })
  public senderId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "receiver_id",
  })
  public receiverId!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  public message!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  public created_at!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  public updated_at!: Date;
}

export default Message;