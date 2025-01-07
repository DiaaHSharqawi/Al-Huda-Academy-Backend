module.exports = (sequelize, DataTypes) => {
  const Supervisor = sequelize.define(
    "Supervisor",
    {
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
    },
    {
      timestamps: true,
    }
  );
  Supervisor.associate = (models) => {
    Supervisor.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Supervisor.belongsTo(models.Gender, {
      foreignKey: {
        name: "gender_id",
        allowNull: false,
      },
    });

    Supervisor.hasMany(models.MemorizationGroup, {
      foreignKey: {
        name: "supervisor_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Supervisor.hasMany(models.SupervisorCertificate, {
      foreignKey: {
        name: "supervisorId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Supervisor.belongsToMany(models.Juza, {
      through: models.SupervisorAjzaa,
      foreignKey: {
        name: "supervisor_id",
        allowNull: false,
      },
      otherKey: {
        name: "juza_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Supervisor;
};
