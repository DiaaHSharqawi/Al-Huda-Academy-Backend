module.exports = (sequelize, DataTypes) => {
  const ContentToReview = sequelize.define(
    "ContentToReview",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      groupPlanId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "group_plan",
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
      timestamps: true,
      tableName: "content_to_review",
    }
  );

  ContentToReview.associate = (models) => {
    ContentToReview.belongsTo(models.GroupPlan, {
      foreignKey: {
        name: "groupPlanId",
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
