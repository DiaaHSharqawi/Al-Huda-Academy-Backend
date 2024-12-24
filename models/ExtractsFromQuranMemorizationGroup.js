module.exports = (sequelize, DataTypes) => {
  const ExtractsFromQuranMemorizationGroup = sequelize.define(
    "ExtractsFromQuranMemorizationGroup",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      surahId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: "Surah",
          key: "id",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
      },
      ayat: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "extracts_from_quran_memorization_group",
      timestamps: false,
    }
  );

  ExtractsFromQuranMemorizationGroup.associate = (models) => {
    ExtractsFromQuranMemorizationGroup.belongsTo(models.Surah, {
      foreignKey: {
        name: "surahId",
        allowNull: false,
      },
    });
    ExtractsFromQuranMemorizationGroup.belongsTo(models.MemorizationGroup, {
      foreignKey: {
        name: "groupId",
        allowNull: false,
      },
    });
  };

  return ExtractsFromQuranMemorizationGroup;
};
