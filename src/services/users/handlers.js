import userController from "../../db/controllers/user.controller.js";
const { 
  findAllUsers,
  findUser,
  newRecord,
  updateOne,
  deleteOne} = userController;

async function getUsers(req, res, next) {
  try {
    await findAllUsers(req,res);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    await findUser(req,res);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function newUser(req, res, next) {
  try {
    await newRecord(req,res);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    await updateOne(req,res);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    await deleteOne(req,res);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

const userHandler = {
  getUsers,
  getUser,
  newUser,
  updateUser,
  deleteUser,
};

export default userHandler;
