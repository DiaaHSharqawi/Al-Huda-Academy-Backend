module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define("Participant", {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
      allowNull: false,
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
  };

  return Participant;
};
