const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const PasswordResetCode = sequelize.define(
    "PasswordResetCode",
    {
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "password_reset_code",
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: false,
    }
  );
  PasswordResetCode.associate = (models) => {
    PasswordResetCode.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  PasswordResetCode.deleteExpiredTokens = async () => {
    const now = new Date();
    const oneMinuteFromNow = new Date(now.getTime() + 1 * 60000);
    await PasswordResetCode.destroy({
      where: {
        expiresAt: {
          [Op.lt]: oneMinuteFromNow,
        },
      },
    });
  };
  return PasswordResetCode;
};
