'use strict';
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    timestamps: false     // 将不自动添加createdAt, updatedAt两个字段("Unknown column 'createdAt' in 'field list'")
  });
  Person.associate = function(models) {
    // associations can be defined here
  };
  return Person;
};