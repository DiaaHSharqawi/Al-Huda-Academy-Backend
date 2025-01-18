module.exports = (sequelize, DataTypes) => {
  const AccountStatus = sequelize.define(
    "AccountStatus",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      englishName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      arabicName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      tableName: "account_status",
      timestamps: false,
    }
  );

  AccountStatus.associate = (models) => {
    AccountStatus.hasMany(models.User, {
      foreignKey: {
        name: "accountStatusId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return AccountStatus;
};
