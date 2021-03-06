import express from "express";
import products from "./handlers.js";
import uploadProductImageToCloud from "../../lib/imageHandler.js";


const productsRouter = express.Router();

productsRouter.get("/", products.getAllProducts);
productsRouter.post("/", products.createNewProduct);

productsRouter.route("/:id")
.get(products.getProductById)
.put(products.updateProductById)
.delete(products.deleteProductById)

productsRouter.route("/:id/cover")
.post(uploadProductImageToCloud, products.updateProductImageURL)



export default productsRouter;