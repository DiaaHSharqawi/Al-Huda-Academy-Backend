module.exports = (sequelize, DataTypes) => {
  const Surah = sequelize.define(
    "Surah",
    {
      number: {
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
    }
  );

  return Surah;
};
