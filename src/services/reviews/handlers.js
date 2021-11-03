import models from "../../db/models/index.js";
const { Review, Product } = models;


async function getReviews(req, res, next) {
  try {
    const data = await Review.findAll({
      include: Product,
      order: [['id', 'ASC'], [{model: Product}, 'id', 'ASC']],
    });
    if(data.length) {
      res.send(data);
    } else {
      res.status(400).send("No reviews to show.");
    }
  } catch (error) {
    next(error);
  }
}


async function getReviewById(req,res,next) {
  try {
    const reviewById = await Review.findByPk(req.params.id);
    if(reviewById) {
      res.send(reviewById);
    } else {
      res.status(400).send("No review found.");
    }
  } catch (error) {
    next(error);
  }
}


async function postNewReview(req, res, next) {
  try {
    const newReview = await Review.create(req.body);
    res.send(newReview);
  } catch (error) {
    next(error);
  }
}


async function updateReviewById(req, res, next) {
  try {
    const updatedReview = await Review.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });

    res.send(updatedReview[1][0]);
  } catch (error) {
    next(error);
  }
}

async function deleteReviewById(req, res, next) {
  try {
    await Review.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(204).send();
  } catch (error) {
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
