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

  return AttendanceStatus;
};
