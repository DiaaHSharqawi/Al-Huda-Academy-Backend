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
      group_status_id: {
        type: DataTypes.INTEGER,
        foreignKey: {
          tableName: "group_status",
          sourceKey: "id",
          allowNull: false,
        },
        allowNull: false,
      },
      group_goal_id: {
        type: DataTypes.INTEGER,
        foreignKey: {
          name: "group_goal_id",
          tableName: "group_goal",
          allowNull: false,
        },
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
      group_completion_rate_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "quran_memorizing_amounts",
          key: "id",
        },
      },
      teaching_method_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "teaching_methods",
          key: "id",
        },
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

    MemorizationGroup.belongsToMany(models.Day, {
      through: models.DayMemorizationGroup,
      foreignKey: {
        name: "group_id",
        allowNull: false,
      },
      otherKey: {
        name: "day_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    MemorizationGroup.belongsToMany(models.Language, {
      through: models.GroupLanguage,
      foreignKey: {
        name: "group_id",
        allowNull: false,
      },
      otherKey: {
        name: "language_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    MemorizationGroup.belongsToMany(models.Participant, {
      through: models.GroupJoinRequest,
      foreignKey: {
        name: "group_id",
        allowNull: false,
      },
      otherKey: {
        name: "participant_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    MemorizationGroup.belongsToMany(models.Participant, {
      through: models.GroupMembers,
      foreignKey: {
        name: "group_id",
        allowNull: false,
      },
      otherKey: {
        name: "participant_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    MemorizationGroup.belongsTo(models.QuranMemorizingAmount, {
      foreignKey: {
        name: "group_completion_rate_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    MemorizationGroup.belongsTo(models.Gender, {
      foreignKey: {
        name: "gender_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    MemorizationGroup.belongsTo(models.GroupStatus, {
      foreignKey: {
        name: "group_status_id",
        tableName: "group_status",
        sourceKey: "id",
        allowNull: false,
      },
    });

    MemorizationGroup.belongsTo(models.GroupGoal, {
      foreignKey: {
        name: "group_goal_id",
        sourceKey: "id",
        allowNull: false,
      },

      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    MemorizationGroup.hasMany(models.GroupPlan, {
      foreignKey: {
        name: "groupId",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return MemorizationGroup;
};
