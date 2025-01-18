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
      start_surah: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      end_surah: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start_ayah: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      end_ayah: {
        type: DataTypes.INTEGER,
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

    Juza.belongsTo(models.Surah, {
      foreignKey: {
        name: "start_surah",
        allowNull: false,
      },
      as: "StartSurah",
      constraints: false,
    });

    Juza.belongsTo(models.Surah, {
      foreignKey: {
        name: "end_surah",
        allowNull: false,
      },
      as: "EndSurah",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      constraints: false,
    });
  };

  return Juza;
};
