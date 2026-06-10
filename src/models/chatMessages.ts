// Socket 

import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName:'tbl_chat_messages',
    timestamps:true,
    createdAt:'created_at',
    updatedAt:'updated_at'
})

class ChatMessage extends Model{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    })
    public id!:number;
    

    
    @Column({
        type:DataType.DATE,
        allowNull:false
    })
    public created_at!:Date;

    @Column({
        type:DataType.DATE,
        allowNull:false
    })
    public updated_at!:Date;
}

export default ChatMessage;