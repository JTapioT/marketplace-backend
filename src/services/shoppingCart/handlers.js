import productUserController from "../../db/controllers/cart.controller.js";
const {
  getShoppingCart, addToShoppingCart, deleteProductFromCart
} = productUserController;

async function userShoppingCart(req,res,next) {
  try {
    await getShoppingCart(req,res);
  } catch (error) {
    console.log(error);
    next(error);
  }
}


async function updateShoppingCart(req,res,next) {
  try {
    await addToShoppingCart(req,res);
  } catch (error) {
    console.log(error);
    next(error);
  }
}


async function deleteFromShoppingCart(req,res,next) {
  try {
    await deleteProductFromCart(req,res);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

const shoppingCartHandler = {
  userShoppingCart, updateShoppingCart, deleteFromShoppingCart
}

export default shoppingCartHandler;