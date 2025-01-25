module.exports = (sequelize, DataTypes) => {
  const GroupPlanStatus = sequelize.define(
    "GroupPlanStatus",
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
      tableName: "group_plan_status",
    }
  );

  GroupPlanStatus.associate = (models) => {
    GroupPlanStatus.hasMany(models.GroupPlan, {
      foreignKey: {
        name: "group_plan_status_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return GroupPlanStatus;
};
