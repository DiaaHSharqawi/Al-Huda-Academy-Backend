module.exports = (sequelize, DataTypes) => {
  const TeachingMethods = sequelize.define(
    "TeachingMethods",
    {
      methodNameArabic: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      methodNameEnglish: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      descriptionArabic: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      descriptionEnglish: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: "teaching_methods",
      timestamps: true,
    }
  );

  TeachingMethods.associate = (models) => {
    TeachingMethods.hasMany(models.MemorizationGroup, {
      foreignKey: {
        name: "teaching_method_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return TeachingMethods;
};
