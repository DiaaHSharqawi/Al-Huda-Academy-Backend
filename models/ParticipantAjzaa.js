module.exports = (sequelize, DataTypes) => {
  const ParticipantAjzaa = sequelize.define(
    "ParticipantAjzaa",
    {
      participant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "participant",
          key: "id",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
      },
      juza_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "juza",
          key: "id",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
      },
    },
    {
      tableName: "participant_ajzaa",
      timestamps: false,
    }
  );
  ParticipantAjzaa.associate = (models) => {
    ParticipantAjzaa.belongsTo(models.Participant, {
      foreignKey: {
        name: "participant_id",
        allowNull: false,
      },
    });

    ParticipantAjzaa.belongsTo(models.Juza, {
      foreignKey: {
        name: "juza_id",
        allowNull: false,
      },
    });
  };

  return ParticipantAjzaa;
};
