module.exports = (sequelize, DataTypes) => {
  const AttendanceStatus = sequelize.define(
    "AttendanceStatus",
    {
      name_ar: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name_en: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "attendance_status",
      timestamps: false,
    }
  );

  AttendanceStatus.associate = (models) => {
    AttendanceStatus.hasMany(models.GroupMembersFollowUpRecord, {
      foreignKey: {
        name: "attendance_status_id",
        allowNull: false,
      },
    });
  };
  return AttendanceStatus;
};
