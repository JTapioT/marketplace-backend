import models from "../models/index.js";
const { Product, Category, ProductCategory, Cart } = models;
import sequelize from "sequelize";


// Overall idea:
// ShoppingCart, ProductUser join table
// Will hold information about product and userid
// Hence, this one table acts as a large shopping cart
// with information about products and what user has it in the 
// shopping cart


// FINALLY, IT WORKS!!
// TODO: Can't understand why reference to table is eg. product.price, not products.price as the table name is 'products'. Confused.
async function getShoppingCart(req,res) {
  try {
    const cart = await Cart.findAll({
      where: {
        userId: req.params.id,
      },
      attributes: [
        "productId",
        [sequelize.fn("COUNT", "cart.productId"), "unitary_qty"],
        [sequelize.fn("SUM", sequelize.col("product.price")), "unitary_price"],
      ],
      include: [
        {
          model: Product,
          attributes: ["name", "price"],
          include: [
            {
              model: Category,
              through: { model: ProductCategory, attributes: [] },
              attributes: ["name"],
            },
          ],
        },
      ],
      group: ["cart.productId","cart.id", "product.id", "product.categories.id"],
    });

  const totalQuantity = await Cart.count({
      where: {
        userId: req.params.id,
      },
    });

    const totalPrice = await Cart.sum("product.price", {
      include: {model: Product, attributes: [] },
    });

    if(cart.length) {
      res.send({totalQuantity, totalPrice, cart});
    } else {
      res.status(400).send("No products in the shopping cart.");
    }
  } catch (error) {
    throw new Error(error);
  }
}


async function addToShoppingCart(req,res) {
  try {
    await Cart.create({
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
    await Cart.destroy({
      where: {
        productId: req.body.productId,
        userId: req.params.id
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