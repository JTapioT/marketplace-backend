import categoryController from "../../db/controllers/category.controller.js";
const {
  findAll,
  findOne,
  newRecord,
  updateOne,
  deleteOne,
} = categoryController ;

async function getCategories(req, res, next) {
  try {
    await findAll(req,res);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function getCategory(req, res, next) {
  try {
    await findOne(req,res);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function newCategory(req, res, next) {
  try {
    await newRecord(req,res);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function updateCategory(req, res, next) {
  try {
    await updateOne(req,res);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function deleteCategory(req, res, next) {
  try {
    await deleteOne(req,res);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

const categoryHandler = {
  getCategories,
  getCategory,
  newCategory,
  updateCategory,
  deleteCategory,
};

export default categoryHandler;
