import { getAllReviews, findOneReview, newReview, updateReview, deleteReview } from "../../db/controllers/review.controller.js";

async function getReviews(req, res, next) {
  try {
    await getAllReviews(req,res);
  } catch (error) {
    console.log(error);
    next(error);
  }
}


async function getReviewById(req,res,next) {
  try {
    await findOneReview(req,res);
  } catch (error) {
    console.log(error);
    next(error);
  }
}


async function postNewReview(req, res, next) {
  try {
    await newReview(req,res);
  } catch (error) {
    console.log(error);
    next(error);
  }
}


async function updateReviewById(req, res, next) {
  try {
    await updateReview(req,res);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function deleteReviewById(req, res, next) {
  try {
    await deleteReview(req,res);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

const reviews = {
  getReviews,
  getReviewById,
  postNewReview,
  deleteReviewById,
  updateReviewById,
};

export default reviews;
