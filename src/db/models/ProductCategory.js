import sequelize from "../index.js";
import s from "sequelize";
const { DataTypes } = s;

// Todo:
// Find out later defaultValue property need in this situation (optional or not)
// UUID - Universally unique identifier, convention to use this as id within databases?
// Self-explanatory to not use autoIncrement property here, since it is not applicable here forUUID
// timeStamps - I assume that this is not something what is not needed in join tables.

const ProductCategory = sequelize.define(
  "productsCategories",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  { timestamps: false },
);

export default ProductCategory;
