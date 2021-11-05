import models from "../../db/models/index.js";
const { Category } = models;

async function findAll(req, res) {
  try {
    const {count, rows} = await Category.findAndCountAll();
    if (rows.length) {
      res.send({count:count, data: rows});
    } else {
      res.status(400).send("No categories to show.");
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function findOne(req, res) {
  try {
    const categoryById = await Category.findByPk(req.params.id);
    if (categoryById) {
      res.send(categoryById);
    } else {
      res.status(400).send("No category found by id.");
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function newRecord(req, res) {
  try {
    const newCategory = await Category.create(req.body);
    res.send(newCategory);
  } catch (error) {
    throw new Error(error);
  }
}

async function updateOne(req, res) {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.send(updatedCategory[1][0]);
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteOne(req, res) {
  try {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).send();
  } catch (error) {
    throw new Error(error);
  }
}

const categoryController = {
  findAll,
  findOne,
  newRecord,
  updateOne,
  deleteOne
}
export default categoryController;

