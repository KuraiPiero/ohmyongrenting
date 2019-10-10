"use strict";
module.exports = (sequelize, DataTypes) => {
  const VericationToken = sequelize.define(
    "VericationToken",
    {
      usuario_id: DataTypes.INTEGER,
      token: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          verificationtoken.belongsTo(models.Usuario, {
            as: "usuario",
            foreignKey: "usuario_id",
            foreignKeyConstraint: true
          });
        }
      }
    }
  );
  VericationToken.associate = function(models) {
    // associations can be defined here
  };
  return VericationToken;
};
