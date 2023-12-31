"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static async associate(models) {
      User.belongsTo(models.Allcode, {
        foreignKey: 'positionId',
        targetKey: 'keyMap',
        as: 'positionData'
      });
      
      User.belongsTo(models.Allcode, {
        foreignKey: 'gender',
        targetKey: 'keyMap',
        as: 'genderData'
      });

      User.hasOne(models.Markdown, {
        foreignKey: 'doctorId',
      });

      User.hasOne(models.Doctor_Info, {
        foreignKey: 'doctorId',
      })

      User.hasMany(models.Schedule, {
        foreignKey: 'doctorId',
        as: 'doctorData',
      })

      User.hasMany(models.Booking, {
        foreignKey: 'patientID',
        as: 'patientData',
      })
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
