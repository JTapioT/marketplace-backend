import sequelize from "../index.js";
import s from "sequelize";
const { DataTypes } = s;

const ProductUser = sequelize.define("productsUser", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

export default ProductUser;