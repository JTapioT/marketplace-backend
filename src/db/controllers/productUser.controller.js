import models from "../../db/models/index.js";
const { ProductUser, User, Product } = models;


// Overall idea:
// ShoppingCart, ProductUser join table
// Will hold information about product and userid
// Hence, this one table acts as a large shopping cart
// with information about products and what user has it in the 
// shopping cart

// I could be 100% wrong with the approach here but, well, try it now.

// TODO: Change later what attributes to include!!

async function getShoppingCart(req,res) {
  try {
    const {count, rows} = await User.findAndCountAll({
      include: [
        {
          model: Product,
          through: {model: ProductUser}
        }
      ],
      where: {
        id: req.params.id
      }
    });
    if(rows.length) {
      res.send({count: count, data: rows})
    } else {
      res.status(400).send("No products in the shopping cart.");
    }
  } catch (error) {
    throw new Error(error);
  }
}


async function addToShoppingCart(req,res) {
  try {
    await ProductUser.create({
      userId: req.params.id, 
      productId: req.body.productId
    });
    res.send({status: "success", message: "Item added to shopping cart."});
  } catch (error) {
    throw new Error(error);
  }
}


async function deleteProductFromCart(req,res) {
  try {
    await ProductUser.destroy({
      where: {
        productId: req.body.productId
      }
    });
    res.status(204).send();
  } catch (error) {
    throw new Error(error);
  }
}

const productUserController = {
  getShoppingCart, addToShoppingCart, deleteProductFromCart
}

export default productUserController;