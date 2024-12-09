const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const ChildFamilyLinkVerificationCode = sequelize.define(
    "ChildFamilyLinkVerificationCode",
    {
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recipientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "child_family_link_verification_code",
      createdAt: "createdAt",
      updatedAt: false,
    }
  );

  ChildFamilyLinkVerificationCode.associate = (models) => {
    ChildFamilyLinkVerificationCode.belongsTo(models.User, {
      foreignKey: {
        name: "senderId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    ChildFamilyLinkVerificationCode.belongsTo(models.User, {
      foreignKey: {
        name: "recipientId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  ChildFamilyLinkVerificationCode.deleteExpiredCodes = async () => {
    const now = new Date();
    const tenMinutesFromNow = new Date(now.getTime() + 10 * 60000);
    await ChildFamilyLinkVerificationCode.destroy({
      where: {
        createdAt: {
          [Op.lt]: tenMinutesFromNow,
        },
      },
    });
  };

  return ChildFamilyLinkVerificationCode;
};
