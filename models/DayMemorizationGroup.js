module.exports = (sequelize, DataTypes) => {
  const DayMemorizationGroup = sequelize.define(
    "DayMemorizationGroup",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      day_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "day",
          key: "id",
        },
        allowNull: false,
      },
      group_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "memorization_group",
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      tableName: "day_memorization_group",
      timestamps: false,
    }
  );

  DayMemorizationGroup.associate = (models) => {
    DayMemorizationGroup.belongsTo(models.Day, {
      foreignKey: {
        name: "day_id",
        allowNull: false,
      },
    });

    DayMemorizationGroup.belongsTo(models.MemorizationGroup, {
      foreignKey: {
        name: "group_id",
        allowNull: false,
      },
    });
  };

  return DayMemorizationGroup;
};
