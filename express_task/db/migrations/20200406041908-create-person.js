'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('People', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        // field: 'user_name'  // 数据库中对应的字段名
      },
      password: {
        type: Sequelize.STRING,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('People');
  }
};