module.exports = (sequelize, DataTypes) => {
  const Day = sequelize.define(
    "Day",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name_en: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name_ar: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "day",
      timestamps: false,
    }
  );

  Day.associate = (models) => {
    Day.belongsToMany(models.MemorizationGroup, {
      through: models.DayMemorizationGroup,
      foreignKey: {
        name: "day_id",
        allowNull: false,
      },
      otherKey: {
        name: "group_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Day;
};
