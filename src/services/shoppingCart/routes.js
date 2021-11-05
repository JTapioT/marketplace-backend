import express from "express";
import shoppingCartHandler from "./handlers.js";
const {
  userShoppingCart, updateShoppingCart, deleteFromShoppingCart
} = shoppingCartHandler;

const shoppingCartRouter = express.Router();

shoppingCartRouter.route("/:id")
.get(userShoppingCart)
.post(updateShoppingCart)
.delete(deleteFromShoppingCart);

export default shoppingCartRouter;