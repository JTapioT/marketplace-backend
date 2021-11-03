import express from "express";
import reviews from "./handlers.js";

const reviewsRouter = express.Router();

reviewsRouter.get("/", reviews.getReviews);
reviewsRouter.post("/", reviews.postNewReview);
reviewsRouter.get("/:id", reviews.getReviewById);
reviewsRouter.put("/:id", reviews.updateReviewById);
reviewsRouter.delete("/:id", reviews.deleteReviewById);

export default reviewsRouter;