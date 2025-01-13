module.exports = (sequelize, DataTypes) => {
  const QuranMemorizingAmount = sequelize.define(
    "QuranMemorizingAmount",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      amountArabic: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amountEnglish: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "quran_memorizing_amounts",
      timestamps: false,
    }
  );

  QuranMemorizingAmount.associate = (models) => {
    QuranMemorizingAmount.hasMany(models.Participant, {
      foreignKey: {
        name: "quranMemorizingAmountsId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    QuranMemorizingAmount.hasMany(models.MemorizationGroup, {
      foreignKey: {
        name: "group_completion_rate_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return QuranMemorizingAmount;
};
