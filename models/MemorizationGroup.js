module.exports = (sequelize, DataTypes) => {
  const MemorizationGroup = sequelize.define(
    "MemorizationGroup",
    {
      group_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      group_description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      group_status: {
        type: DataTypes.ENUM(
          "Active",
          "Inactive",
          "Completed",
          "Cancelled",
          "Pending",
          "Full"
        ),
        allowNull: false,
      },
      group_goal: {
        type: DataTypes.ENUM(
          "memorization",
          "recitation",
          "revision",
          "تحفيظ",
          "تلاوة",
          "مراجعة"
        ),

        allowNull: false,
      },
      days: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      participants_gender: {
        type: DataTypes.ENUM("males", "females", "ذكور", "إناث"),
        allowNull: false,
      },
      participants_level: {
        type: DataTypes.ENUM(
          "junior",
          "average",
          "advanced",
          "junior-average",
          "average-advanced"
        ),
        allowNull: false,
      },
      supervisor_languages: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      tableName: "memorization_group",
      timestamps: true,
      createdAt: "createdAt",
      updatedAt: false,
    }
  );

  MemorizationGroup.associate = (models) => {
    MemorizationGroup.belongsTo(models.Supervisor, {
      foreignKey: {
        name: "supervisor_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    MemorizationGroup.belongsTo(models.TeachingMethods, {
      foreignKey: {
        name: "teaching_method_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    MemorizationGroup.belongsToMany(models.Surah, {
      through: models.SurahMemorizationGroup,
      foreignKey: {
        name: "groupId",
        allowNull: false,
      },
      otherKey: {
        name: "surahId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    MemorizationGroup.belongsToMany(models.Juza, {
      through: models.JuzaMemorizationGroup,
      foreignKey: {
        name: "groupId",
        allowNull: false,
      },
      otherKey: {
        name: "juzaId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    MemorizationGroup.belongsToMany(models.Surah, {
      through: models.ExtractsFromQuranMemorizationGroup,
      foreignKey: {
        name: "surahId",
        allowNull: false,
      },
      otherKey: {
        name: "groupId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return MemorizationGroup;
};
