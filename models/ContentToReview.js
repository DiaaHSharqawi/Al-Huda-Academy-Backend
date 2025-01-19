module.exports = (sequelize, DataTypes) => {
  const ContentToReview = sequelize.define(
    "ContentToReview",
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
      timestamps: false,
      tableName: "content_to_review",
    }
  );

  ContentToReview.associate = (models) => {
    ContentToReview.belongsTo(models.GroupWeeklyPlan, {
      foreignKey: {
        name: "groupWeeklyPlanId",
        sourceKey: "id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    ContentToReview.belongsTo(models.Surah, {
      foreignKey: {
        name: "surahId",
        sourceKey: "id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return ContentToReview;
};
