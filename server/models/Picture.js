const { INTEGER } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Picture = sequelize.define("Picture", {
    data: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
    },
  });

  Picture.associate = (models) => {
    Picture.belongsTo(models.Users, {
      onDelete: "cascade",
    });
  };
  return Picture;
};
