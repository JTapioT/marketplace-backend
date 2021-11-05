import models from "../../db/models/index.js";
const { User } = models;

async function findAllUsers(req, res) {
  try {
    const {count, rows} = await User.findAndCountAll();
    if (rows.length) {
      res.send({count: count, data: rows});
    } else {
      res.status(400).send("No users to show.");
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function findUser(req, res) {
  try {
    const userById = await User.findByPk(req.params.id);
    if (userById) {
      res.send(userById);
    } else {
      res.status(400).send("No user found.");
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function newRecord(req, res) {
  try {
    const newUser = await User.create(req.body);
    res.send(newUser);
  } catch (error) {
    throw new Error(error);
  }
}

async function updateOne(req, res) {
  try {
    const updatedUser = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.send(updatedUser[1][0]);
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteOne(req, res) {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).send();
  } catch (error) {
    throw new Error(error);
  }
}

const userController = {
  findAllUsers,
  findUser,
  newRecord,
  updateOne,
  deleteOne,
};
export default userController;
