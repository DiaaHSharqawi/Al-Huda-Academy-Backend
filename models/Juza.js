module.exports = (sequelize, DataTypes) => {
  const Juza = sequelize.define(
    "Juza",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      arabic_part: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      english_part: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "juza",
      timestamps: false,
    }
  );
  Juza.associate = (models) => {
    Juza.belongsToMany(models.MemorizationGroup, {
      through: models.JuzaMemorizationGroup,
      foreignKey: {
        name: "juzaId",
        allowNull: false,
      },
      otherKey: {
        name: "groupId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Juza;
};
