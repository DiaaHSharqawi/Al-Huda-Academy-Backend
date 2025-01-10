module.exports = (sequelize, DataTypes) => {
  const GroupJoinRequestStatus = sequelize.define(
    "GroupJoinRequestStatus",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name_english: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name_arabic: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "group_join_request_status",
      timestamps: false,
    }
  );

  GroupJoinRequestStatus.associate = (models) => {
    GroupJoinRequestStatus.hasMany(models.GroupJoinRequest, {
      foreignKey: {
        name: "join_request_status_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return GroupJoinRequestStatus;
};
