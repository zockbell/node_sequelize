'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    deadline: DataTypes.DATE,
    content: DataTypes.STRING,
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    timestamps: false     // 将不自动添加createdAt, updatedAt两个字段("Unknown column 'createdAt' in 'field list'")
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};