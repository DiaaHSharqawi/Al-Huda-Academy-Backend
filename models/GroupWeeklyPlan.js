module.exports = (sequelize, DataTypes) => {
  const GroupWeeklyPlan = sequelize.define(
    "GroupWeeklyPlan",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "memorization_group",
          key: "id",
        },
      },
      weekNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "group_weekly_plan",
    }
  );
  GroupWeeklyPlan.associate = (models) => {
    GroupWeeklyPlan.belongsTo(models.MemorizationGroup, {
      foreignKey: {
        name: "groupId",
        sourceKey: "id",
        allowNull: false,
      },

      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    GroupWeeklyPlan.hasMany(models.ContentToReview, {
      foreignKey: {
        name: "groupWeeklyPlanId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    GroupWeeklyPlan.hasMany(models.ContentToMemorize, {
      foreignKey: {
        name: "groupWeeklyPlanId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return GroupWeeklyPlan;
};
