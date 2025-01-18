module.exports = (sequelize, DataTypes) => {
  const SupervisorAjzaa = sequelize.define(
    "SupervisorAjzaa",
    {
      supervisor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "supervisor",
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
      tableName: "supervisor_ajzaa",
      timestamps: false,
    }
  );
  SupervisorAjzaa.associate = (models) => {
    SupervisorAjzaa.belongsTo(models.Supervisor, {
      foreignKey: {
        name: "supervisor_id",
        allowNull: false,
      },
    });

    SupervisorAjzaa.belongsTo(models.Juza, {
      foreignKey: {
        name: "juza_id",
        allowNull: false,
      },
    });
  };

  return SupervisorAjzaa;
};
