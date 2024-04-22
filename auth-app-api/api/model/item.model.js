import { DataTypes } from "sequelize";

export const ItemModel = async (sequelize) => {
  return await sequelize.define("Item", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
