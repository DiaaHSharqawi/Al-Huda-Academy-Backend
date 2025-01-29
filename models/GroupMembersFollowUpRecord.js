module.exports = (sequelize, DataTypes) => {
  const GroupMembersFollowUpRecord = sequelize.define(
    "GroupMembersFollowUpRecord",
    {
      group_member_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "group_member",
          key: "id",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
      },
      group_plan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "group_plan",
          key: "id",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
      },
      grade_of_memorization: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      grade_of_review: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      attendance_status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "attendance_status",
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
      tableName: "group_members_follow_up_records",
    }
  );

  GroupMembersFollowUpRecord.associate = (models) => {
    GroupMembersFollowUpRecord.belongsTo(models.GroupMembers, {
      foreignKey: {
        name: "group_member_id",
        allowNull: false,
      },
    });

    GroupMembersFollowUpRecord.belongsTo(models.GroupPlan, {
      foreignKey: {
        name: "group_plan_id",
        allowNull: false,
      },
    });

    GroupMembersFollowUpRecord.belongsTo(models.AttendanceStatus, {
      foreignKey: {
        name: "attendance_status_id",
        allowNull: false,
      },
    });
  };

  return GroupMembersFollowUpRecord;
};
