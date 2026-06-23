'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_messages", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      unique_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
      },

      sender_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      receiver_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      reply_to_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },

      message_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      media_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      media_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      media_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      media_size: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_edited: {
        type: Sequelize.BOOLEAN,
        
      },

      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      read_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      delivered_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },

      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },

      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("tbl_messages");
  },
};