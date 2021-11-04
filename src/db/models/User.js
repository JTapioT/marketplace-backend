import sequelize from "../index.js";
import s from "sequelize";
const { DataTypes } = s;

const User = sequelize.define("users", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      isEmail: true,
      unique: true
    }
  }
});

export default User;