module.exports = (sequelize, DataTypes) => {
  const GroupStatus = sequelize.define(
    "GroupStatus",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status_name_ar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status_name_en: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "group_status",
      timestamps: false,
    }
  );
  GroupStatus.associate = (models) => {
    GroupStatus.hasMany(models.MemorizationGroup, {
      foreignKey: {
        name: "group_status_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return GroupStatus;
};
