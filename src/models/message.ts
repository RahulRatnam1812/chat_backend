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
    type: DataType.BIGINT,
    allowNull: true,
    field: "reply_to_id",
  })
  public replyToId!: string;
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "message_type",
  })
  public messageType!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  public message!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  public media_url!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  public media_type!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  public media_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  public media_size!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public status!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: "read_at",
  })
  public readAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: "delivered_at",
  })
  public deliveredAt!: Date;

  
  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: "created_at",
  })
  public createdAt!: Date;
  
  @Column({
    type: DataType.DATE,
    field: "updated_at",
  })
  public updatedAt!: Date;
  
  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: "deleted_at",
  })
  public deletedAt!: Date;
}

export default Message;