module.exports = (sequelize, DataTypes) => {
  const GroupMembers = sequelize.define(
    "GroupMembers",
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
    },
    {
      tableName: "group_member",
      timestamps: true,
    }
  );

  GroupMembers.associate = (models) => {
    GroupMembers.belongsTo(models.MemorizationGroup, {
      foreignKey: {
        name: "group_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    GroupMembers.belongsTo(models.Participant, {
      foreignKey: {
        name: "participant_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return GroupMembers;
};
