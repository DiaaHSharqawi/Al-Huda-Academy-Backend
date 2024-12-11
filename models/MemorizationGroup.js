module.exports = (sequelize, DataTypes) => {
  const MemorizationGroup = sequelize.define(
    "MemorizationGroup",
    {
      group_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      group_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      group_status: {
        type: DataTypes.ENUM(
          "Active",
          "Inactive",
          "Completed",
          "Cancelled",
          "Pending",
          "Full"
        ),
        allowNull: false,
      },
      days: {
        type: DataTypes.ENUM(
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ),
        allowNull: false,
      },
    },
    {
      tableName: "memorization_group",
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: false,
    }
  );

  MemorizationGroup.associate = (models) => {
    MemorizationGroup.belongsTo(models.Supervisor, {
      foreignKey: {
        name: "supervisor_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    MemorizationGroup.hasMany(models.Participant, {
      foreignKey: {
        name: "participant_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return MemorizationGroup;
};
