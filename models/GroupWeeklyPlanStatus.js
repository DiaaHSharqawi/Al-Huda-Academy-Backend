module.exports = (sequelize, DataTypes) => {
  const GroupWeeklyPlanStatus = sequelize.define(
    "GroupWeeklyPlanStatus",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name_ar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name_en: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "group_weekly_plan_status",
    }
  );

  GroupWeeklyPlanStatus.associate = (models) => {
    GroupWeeklyPlanStatus.hasMany(models.GroupWeeklyPlan, {
      foreignKey: {
        name: "group_weekly_plan_status_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return GroupWeeklyPlanStatus;
};
