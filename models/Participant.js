module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define("Participant", {
    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quranMemorizingAmountsId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "quran_memorizing_amounts",
        key: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    gender_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "genders",
        key: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Participant.associate = (models) => {
    Participant.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Participant.belongsTo(models.Gender, {
      foreignKey: {
        name: "gender_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Participant.belongsTo(models.QuranMemorizingAmount, {
      foreignKey: {
        name: "quranMemorizingAmountsId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Participant.belongsToMany(models.Juza, {
      through: models.ParticipantAjzaa,
      foreignKey: {
        name: "participant_id",
        allowNull: false,
      },
      otherKey: {
        name: "juza_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Participant.belongsToMany(models.MemorizationGroup, {
      through: models.GroupJoinRequest,
      foreignKey: {
        name: "participant_id",
        allowNull: false,
      },
      otherKey: {
        name: "group_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Participant;
};
