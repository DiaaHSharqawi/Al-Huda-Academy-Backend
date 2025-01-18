module.exports = (sequelize, DataTypes) => {
  const GroupJoinRequest = sequelize.define(
    "GroupJoinRequest",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "MemorizationGroup",
          key: "id",
        },
      },
      participant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Participant",
          key: "id",
        },
      },
      join_request_status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "group_join_request_status",
          key: "id",
        },
      },

      responseMessage: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "group_join_requests",
      timestamps: true,
    }
  );

  GroupJoinRequest.associate = (models) => {
    GroupJoinRequest.belongsTo(models.Participant, {
      foreignKey: {
        name: "participant_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    GroupJoinRequest.belongsTo(models.MemorizationGroup, {
      foreignKey: {
        name: "group_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return GroupJoinRequest;
};
