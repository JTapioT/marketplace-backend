import sequelize from "../index.js";
import s from "sequelize";
const { DataTypes } = s;

const Category = sequelize.define("categories", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  }
});

export default Category;