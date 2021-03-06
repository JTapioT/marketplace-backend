import User from "./User.js";
import Product from "./Product.js";
import Review from "./Review.js";
import Category from "./Category.js";
import ProductCategory from "./ProductCategory.js";
import Cart from "./Cart.js";

// One-to-many relation
// Review can belong only to one product. Product can have many reviews.
// It would not make sense to have review about phone also included to eg. kitchen knife.

// Create productId within Review
Product.hasMany(Review, { onDelete: "CASCADE" });
// Create productId within Review
Review.belongsTo(Product, { onDelete: "CASCADE" });

// One-to-many relation
// Review can belong only to one user. User can have many reviews.
User.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(User, { onDelete: "CASCADE" });


/* 
Products - Categories
Many-to-many relation, eg. one product can have many categories and
category can belong to many products. (Maybe better wording later to understand many-to-many relation better with real-life example).

By default, join table will have now productId and reviewId columns.

Also by default join table would make primary key as composed key of the two column values? (re-play the video from lecture to make sure if was the case).

When providing property unique with a value false, default behavior of composed primary key will not happen and primary key will be the one which was set when model ProductCategory was defined within ProductCategory.js 
*/

Product.belongsToMany(Category, {
  through: { model: ProductCategory, unique: false },
});
Category.belongsToMany(Product, {
  through: { model: ProductCategory, unique: false }
})


Product.belongsToMany(User, {
  through: { model: Cart, unique: false },
});
User.belongsToMany(Product, {
  through: { model: Cart, unique: false },
});

// Super thanks to Tetiana for showing advanced Sequelize!
Product.hasMany(Cart); // Product.findAll({include: ProductUser})
Cart.belongsTo(Product); // ProductUser.findAll({include: Product})
User.hasMany(Cart); // User.findAll({include: ProductUser})
Cart.belongsTo(User); // ProductUser.findAll({include: User})

export default { Product, Review, Category, User, ProductCategory, Cart };