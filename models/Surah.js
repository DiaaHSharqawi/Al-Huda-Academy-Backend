module.exports = (sequelize, DataTypes) => {
  const Surah = sequelize.define(
    "Surah",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      englishName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      englishNameTranslation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numberOfAyahs: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      revelationType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "surahs",
      timestamps: false,
      dropTable: true,
    }
  );
  Surah.associate = (models) => {
    Surah.belongsToMany(models.MemorizationGroup, {
      through: models.SurahMemorizationGroup,
      foreignKey: {
        name: "surahId",
        allowNull: false,
      },
      otherKey: {
        name: "groupId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Surah.belongsToMany(models.MemorizationGroup, {
      through: models.ExtractsFromQuranMemorizationGroup,
      foreignKey: {
        name: "surahId",
        allowNull: false,
      },
      otherKey: {
        name: "groupId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Surah.hasOne(models.Juza, {
      allowNull: false,
      references: {
        foreignKey: "end_surah",
        targetKey: "id",
      },
      constraints: false,
    });

    Surah.hasOne(models.Juza, {
      allowNull: false,
      references: {
        foreignKey: "start_surah",
        targetKey: "id",
      },
      constraints: false,
    });

    Surah.hasMany(models.SurahMemorizationGroup, {
      foreignKey: {
        name: "surahId",
        sourceKey: "id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Surah.hasMany(models.ExtractsFromQuranMemorizationGroup, {
      foreignKey: {
        name: "surahId",
        sourceKey: "id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Surah.hasMany(models.ContentToReview, {
      foreignKey: {
        name: "surahId",
        sourceKey: "id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Surah.hasMany(models.ContentToMemorize, {
      foreignKey: {
        name: "surahId",
        sourceKey: "id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Surah;
};
