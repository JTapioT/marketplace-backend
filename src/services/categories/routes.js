import express from "express";
import categoryHandler from "./handlers.js";

const categoryRouter = express.Router();

categoryRouter.get("/", categoryHandler.getCategories);
categoryRouter.post("/", categoryHandler.newCategory);
categoryRouter.route("/:id")
.get(categoryHandler.getCategory)
.put(categoryHandler.updateCategory)
.delete(categoryHandler.deleteCategory)

export default categoryRouter;