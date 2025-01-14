module.exports = (sequelize, DataTypes) => {
  const GroupMembership = sequelize.define(
    "GroupMembership",
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
      tableName: "group_memberships",
      timestamps: true,
    }
  );

  GroupMembership.associate = (models) => {
    GroupMembership.belongsTo(models.MemorizationGroup, {
      foreignKey: {
        name: "group_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    GroupMembership.belongsTo(models.Participant, {
      foreignKey: {
        name: "participant_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    /*GroupMembership.belongsTo(models.GroupMembershipStatus, {
      foreignKey: {
        name: "membership_status_id",
        allowNull: false,
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });*/
  };

  return GroupMembership;
};
