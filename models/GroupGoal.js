module.exports = (sequelize, DataTypes) => {
  const GroupGoal = sequelize.define(
    "GroupGoal",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      group_goal_ar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      group_goal_eng: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "group_goal",
      timestamps: false,
    }
  );
  GroupGoal.associate = (models) => {
    GroupGoal.hasMany(models.MemorizationGroup, {
      foreignKey: {
        name: "group_goal_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return GroupGoal;
};
