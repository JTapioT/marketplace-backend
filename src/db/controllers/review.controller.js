import models from "../../db/models/index.js";
const { Review, Product } = models;
import sequelize from "sequelize";
import User from "../models/User.js";

// I tried to figure out how to separate the concerns even more and from this link
// https://www.bezkoder.com/node-express-sequelize-postgresql/#Create_the_Controller
// I don't know much about Model-View-Controller approach but I guess the folder name 'controllers' would imply that this is where the process of modifying data suitable for database insert is handled. Also, response is being sent here.
// I tried similar approach

export async function getAllReviews(req, res) {
  try {
    const {count, rows} = await Review.findAndCountAll({
      include: [
        { model: Product, attributes: { exclude: ["createdAt", "updatedAt"] } },
      ],
      attributes: {
        exclude: ["productId", "createdAt", "updatedAt"],
      },
      order: [["id", "ASC"]],
    });
    if (rows.length) {
      res.send({count: count, data: rows});
    } else {
      res.status(400).send("No reviews to show.");
    }
  } catch (error) {
    throw new Error(error);
  }
}


export async function findOneReview(req, res) {
  try {
    const reviewById = await Review.findByPk(req.params.id, {
      include: [
        { model: Product, attributes: { exclude: ["createdAt", "updatedAt"] } },
      ],
      attributes: {
        exclude: ["productId", "createdAt", "updatedAt"],
      },
    });
    if (reviewById) {
      res.send(reviewById);
    } else {
      res.status(400).send("No review found.");
    }
  } catch (error) {
    throw new Error(error);
  }
}


export async function newReview(req, res) {
  try {
    const newReview = await Review.create(req.body);
    res.send(newReview);
  } catch (error) {
    throw new Error(error);
  }
}


export async function updateReview(req, res) {
  try {
    const updatedReview = await Review.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.send(updatedReview[1][0]);
  } catch (error) {
    throw new Error(error);
  }
}


export async function deleteReview(req, res) {
  try {
    await Review.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).send();
  } catch (error) {
    throw new Error(error);
  }
}

