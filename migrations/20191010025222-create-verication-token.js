"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("VericationTokens", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        usuario_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onUpdate: "cascade",
          onDelete: "cascade",
          references: { model: "Usuarios", key: "id" }
        },
        token: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      .then(() => {
        console.log("created VerificationToken table");
        return queryInterface.sequelize.query(`
        CREATE EVENT expireToken
        ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL  1 DAY 
        DO
        DELETE FROM verification_tokens WHERE createdAt < DATE_SUB(NOW(), INTERVAL 1 DAY);
        `);
      })
      .then(() => {
        console.log("expireToken event created");
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface
      .dropTable("VericationTokens")
      .then(() => {
        console.log("VericationTokens table dropped");
        return queryInterface.sequelize.query(
          `DROP EVENT IF EXISTS  expireToken`
        );
      })
      .then(() => {
        console.log("expireToken event dropped");
      });
  }
};
