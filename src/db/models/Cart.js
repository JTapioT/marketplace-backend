import sequelize from "../index.js";
import s from "sequelize";
const { DataTypes } = s;

const Cart = sequelize.define("cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
},
{ timestamps: false }
);

export default Cart;