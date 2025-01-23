module.exports = (sequelize, DataTypes) => {
  const GroupPlan = sequelize.define(
    "GroupPlan",
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
      dayDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      group_plan_status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "group_plan_status",
          key: "id",
        },
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      tableName: "group_plan",
    }
  );
  GroupPlan.associate = (models) => {
    GroupPlan.belongsTo(models.MemorizationGroup, {
      foreignKey: {
        name: "groupId",
        sourceKey: "id",
        allowNull: false,
      },

      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    GroupPlan.hasMany(models.ContentToReview, {
      foreignKey: {
        name: "groupPlanId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    GroupPlan.hasMany(models.ContentToMemorize, {
      foreignKey: {
        name: "groupPlanId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    GroupPlan.belongsTo(models.GroupPlanStatus, {
      foreignKey: {
        name: "group_plan_status_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return GroupPlan;
};
