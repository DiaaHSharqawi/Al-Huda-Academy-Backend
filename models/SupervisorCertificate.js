module.exports = (sequelize, DataTypes) => {
  const SupervisorCertificate = sequelize.define(
    "SupervisorCertificate",
    {
      certificateImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { tableName: "supervisor_certificates" }
  );

  SupervisorCertificate.associate = (models) => {
    SupervisorCertificate.belongsTo(models.Supervisor, {
      foreignKey: {
        name: "supervisorId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return SupervisorCertificate;
};
