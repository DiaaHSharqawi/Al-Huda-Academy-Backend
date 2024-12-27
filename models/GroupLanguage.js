module.exports = (sequelize, DataTypes) => {
  const GroupLanguage = sequelize.define(
    "GroupLanguage",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "MemorizationGroup",
          key: "id",
        },
      },
      language_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Language",
          key: "id",
        },
      },
    },
    {
      tableName: "group_language",
    }
  );

  GroupLanguage.associate = (models) => {
    GroupLanguage.belongsTo(models.MemorizationGroup, {
      foreignKey: {
        name: "group_id",
        allowNull: false,
      },
    });
    GroupLanguage.belongsTo(models.Language, {
      foreignKey: {
        name: "language_id",
        allowNull: false,
      },
    });
  };

  return GroupLanguage;
};
