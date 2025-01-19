module.exports = (sequelize, DataTypes) => {
  const ContentToMemorize = sequelize.define(
    "ContentToMemorize",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      groupWeeklyPlanId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "group_weekly_plan",
          key: "id",
        },
      },
      surahId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "surahs",
          key: "id",
        },
      },
      startAyah: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      endAyah: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "content_to_memorize",
      timestamps: true,
    }
  );

  ContentToMemorize.associate = (models) => {
    ContentToMemorize.belongsTo(models.GroupWeeklyPlan, {
      foreignKey: {
        name: "groupWeeklyPlanId",
        sourceKey: "id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    ContentToMemorize.belongsTo(models.Surah, {
      foreignKey: {
        name: "surahId",
        sourceKey: "id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return ContentToMemorize;
};
