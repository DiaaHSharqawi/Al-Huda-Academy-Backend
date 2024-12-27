module.exports = (sequelize, DataTypes) => {
  const ParticipantLevel = sequelize.define(
    "ParticipantLevel",
    {
      participant_level_en: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [
            [
              "junior",
              "average",
              "advanced",
              "junior-average",
              "average-advanced",
            ],
          ],
        },
      },
      participant_level_ar: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["مبتدئ", "متوسط", "متقدم", "مبتدئ-متوسط", "متوسط-متقدم"]],
        },
      },
    },
    {
      tableName: "participant_level",
    }
  );

  ParticipantLevel.associate = (models) => {
    ParticipantLevel.hasMany(models.MemorizationGroup, {
      foreignKey: {
        name: "participants_level_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return ParticipantLevel;
};
