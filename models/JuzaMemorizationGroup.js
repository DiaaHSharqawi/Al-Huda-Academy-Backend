module.exports = (sequelize, DataTypes) => {
  const JuzaMemorizationGroup = sequelize.define(
    "JuzaMemorizationGroup",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      juzaId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Juza",
          key: "id",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        primaryKey: true,
      },
      groupId: {
        type: DataTypes.INTEGER,
        references: {
          model: "MemorizationGroup",
          key: "id",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        primaryKey: true,
      },
    },
    {
      tableName: "juza_memorization_group",
      timestamps: false,
    }
  );

  JuzaMemorizationGroup.associate = (models) => {
    JuzaMemorizationGroup.belongsTo(models.Juza, {
      foreignKey: {
        name: "juzaId",
        allowNull: false,
      },
    });

    JuzaMemorizationGroup.belongsTo(models.MemorizationGroup, {
      foreignKey: "groupId",
      targetKey: "id",
    });
  };
  return JuzaMemorizationGroup;
};
