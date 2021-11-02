import express from "express";
import products from "./handlers.js";
import reviews from "../reviews/handlers.js";

const productsRouter = express.Router();

productsRouter.get("/", products.getAllProducts);
productsRouter.post("/", products.createNewProduct);

productsRouter.route("/:id")
.get(products.getProductById)
.put(products.updateProductById)
.delete(products.deleteProductById)

productsRouter.route("/:id/reviews")
.get(reviews.getReviews)
.post(reviews.postNewReview);

productsRouter.route("/:id/reviews/:reviewId")
.put(reviews.updateReviewById)
.delete(reviews.deleteReviewById)

export default productsRouter;