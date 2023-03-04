module.exports = (sequelize, DataTypes) => {
  const Picture = sequelize.define("Picture", {
    data: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
    },
  });

  //   Picture.associate = (models) => {
  //     Picture.hasMany(models.Picture, {
  //       onDelete: "cascade",
  //     });
  //   };

  return Picture;
};
//   Picture.associate = (models) => {
//     Picture.belongsTo(models.Post);
//   };
