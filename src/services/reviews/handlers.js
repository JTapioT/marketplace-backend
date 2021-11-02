import pool from "../../db/connect.js";

async function getReviews(req,res,next) {
  try {
    const data = await pool.query("SELECT * FROM reviews WHERE product_id=$1 ORDER BY id ASC;", [req.params.id]);
    if(data.rows.length) {
      res.send(data.rows);
    } else {
      res.status(400).send("No reviews found");
    }
  } catch (error) {
    next(error);
  }
}


async function postNewReview(req,res,next) {
  try {
    const {comment, rate, product_id} = req.body;
    const data = await pool.query("INSERT INTO reviews(comment, rate, product_id) VALUES($1, $2, $3) RETURNING *;", [
      comment, rate, product_id
    ])

    res.send(data.rows[0]);
  } catch (error) {
    next(error);
  }
}


async function deleteReviewById(req,res,next) {
  try {
    await pool.query("DELETE FROM reviews WHERE id=$1", [req.params.reviewId]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}


async function updateReviewById(req,res,next) {
  try {
    const { comment, rate, product_id } = req.body;
    const data = await pool.query("UPDATE reviews SET comment=$1, rate=$2, product_id=$3 WHERE id=$4 RETURNING *;", [
      comment, rate, product_id, req.params.reviewId
    ])
    res.send(data.rows[0]);
  } catch (error) {
    next(error);
  }
}

const reviews = {
  getReviews, postNewReview, deleteReviewById, updateReviewById
}

export default reviews;