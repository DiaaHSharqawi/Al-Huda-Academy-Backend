module.exports = (sequelize, DataTypes) => {
  const Juza = sequelize.define(
    "Juza",
    {
      id: {
        type: DataTypes.INTEGER,
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

    Juza.belongsToMany(models.Supervisor, {
      through: models.SupervisorAjzaa,
      foreignKey: {
        name: "juza_id",
        allowNull: false,
      },
      otherKey: {
        name: "supervisor_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Juza.belongsToMany(models.Participant, {
      through: models.ParticipantAjzaa,
      foreignKey: {
        name: "juza_id",
        allowNull: false,
      },
      otherKey: {
        name: "participant_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Juza;
};
