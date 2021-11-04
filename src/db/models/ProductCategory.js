import sequelize from "../index.js";
import s from "sequelize";
const { DataTypes } = s;

/* 
Find out later defaultValue property need in this situation (optional or not)

"Three of the values provided here (NOW, UUIDV1 and UUIDV4) are special default values, that should not be used to define types. Instead they are used as shorthands for defining default values." - https://sequelize.org/master/variable/index.html#static-variable-DataTypes


UUID - Universally unique identifier, convention to use this as id within databases? - https://bytebase.com/blog/choose-primary-key-uuid-or-auto-increment

Incremental id seems to add readability according to link information.
On the other hand benefits of UUID:

"Globally unique. e.g. No false positive for finding items using log. 
Easy for migrating data between systems since collision is only theoratically possible.
Stateless, it can be generated on the fly.
A sense of secure since malicious user can't guess the ID. However, your security team would always insist that a public accessible UUID path does not meet the security standard."


Self-explanatory to not use autoIncrement property here, since it is not applicable here forUUID

timeStamps - I assume that this is not something what is not needed in join tables.
*/

const ProductCategory = sequelize.define(
  "productsCategories",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // v4 (random UUID)
      primaryKey: true,
    },
  },
  { timestamps: false }
);

export default ProductCategory;
