"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static async associate(models) {
      
    //     User.belongsTo(models.Allcode, {
    //       foreignKey: 'keyMap',
    //       target: 'positionId',
    //       as: 'positionData',
    //     });
    //     User.belongsTo(models.Allcode, {
    //       foreignKey: 'gender',
    //       target: 'keyMap',
    //       as: 'genderData',
    //     });
    // }
    static async associate(models) {
      User.belongsTo(models.Allcode, {
        foreignKey: 'positionId',
        targetKey: 'keyMap',
        as: 'positionData',
      });
      User.belongsTo(models.Allcode, {
        foreignKey: 'gender',
        targetKey: 'keyMap',
        as: 'genderData',
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      phonenumber: DataTypes.STRING,
      roleId: DataTypes.STRING,
      positionId: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};