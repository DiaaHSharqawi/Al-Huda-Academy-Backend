// models/gender.js
module.exports = (sequelize, DataTypes) => {
  const Gender = sequelize.define(
    "Gender",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name_ar: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name_en: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "genders",
      timestamps: false,
    }
  );

  Gender.associate = (models) => {
    Gender.hasMany(models.Supervisor, {
      foreignKey: "gender_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Gender.hasMany(models.Participant, {
      foreignKey: "gender_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Gender.hasMany(models.MemorizationGroup, {
      foreignKey: "gender_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Gender;
};
