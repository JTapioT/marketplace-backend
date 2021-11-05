import {
  findAllProducts,
  findOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../db/controllers/product.controller.js";

//TODO: Find out later why include does not work - for some reason exclude only works for attributes.

async function getAllProducts(req, res, next) {
  try {
    await findAllProducts(req, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    await findOneProduct(req, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function createNewProduct(req, res, next) {
  try {
    await createProduct(req, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function updateProductById(req, res, next) {
  try {
    await updateProduct(req, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

// For handling the image upload and update of database information
async function updateProductImageURL(req, res, next) {
  try {
    const image = req.file.path;
    const productAfterCoverUpdate = await Product.update(
      { image },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    );
    res.send(productAfterCoverUpdate[1][0]);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function deleteProductById(req, res, next) {
  try {
    await deleteProduct(req, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

const products = {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProductById,
  deleteProductById,
  updateProductImageURL,
};

export default products;
