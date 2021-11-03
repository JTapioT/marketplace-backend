import Product from "./Product.js";
import Review from "./Review.js";

// One-to-many relation
// Create productId within Review
Product.hasMany(Review, { onDelete: "CASCADE" });
// Create productId within Review
Review.belongsTo(Product, { onDelete: "CASCADE" });

export default { Product, Review };