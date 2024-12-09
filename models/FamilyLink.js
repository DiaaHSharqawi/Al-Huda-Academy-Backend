module.exports = (sequelize, DataTypes) => {
  const FamilyLink = sequelize.define(
    "FamilyLink",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      family_member_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      relationship_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      linked_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
      },
    },
    {
      timestamps: false,
      tableName: "family_links",
    }
  );

  FamilyLink.associate = (models) => {
    FamilyLink.belongsTo(models.User, {
      foreignKey: "user_id",
    });
    FamilyLink.belongsTo(models.User, {
      foreignKey: "family_member_user_id",
    });
  };

  return FamilyLink;
};
