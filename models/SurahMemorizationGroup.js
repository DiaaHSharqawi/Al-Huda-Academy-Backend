module.exports = (sequelize, DataTypes) => {
  const SurahMemorizationGroup = sequelize.define(
    "SurahMemorizationGroup",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      surahId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Surahs",
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
      tableName: "surah_memorization_group",
      timestamps: false,
    }
  );

  SurahMemorizationGroup.associate = (models) => {
    SurahMemorizationGroup.belongsTo(models.Surah, {
      foreignKey: {
        name: "surahId",
        allowNull: false,
      },
    });

    SurahMemorizationGroup.belongsTo(models.MemorizationGroup, {
      foreignKey: "groupId",
      targetKey: "id",
    });
  };
  return SurahMemorizationGroup;
};
