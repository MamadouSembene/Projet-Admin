'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: DataTypes.STRING,
   // username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    tel:DataTypes.STRING,
    naissance:DataTypes.STRING,
    Prenom:DataTypes.STRING,
    Nom:DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN

  }, {
   classMethods:{
     associate: function(models){
        //association can be defined here
        models.Message.belongsTo(models.User,{
          foreignKey:{
            allowNull:false
          }
        })
     }
   },
    sequelize,
    modelName: 'User',

  });
  return User;
};