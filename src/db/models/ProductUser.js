import sequelize from "../index.js";
import s from "sequelize";
const { DataTypes } = s;

const ProductUser = sequelize.define("productsUser", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, // v4 (random UUID)
    primaryKey: true,
  },
});

export default ProductUser;