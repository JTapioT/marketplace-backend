import models from "../../db/models/index.js";
const { Product, Review } = models;


async function getAllProducts(req,res,next) {
  try {
    const data = await Product.findAll({
      include: Review,
      order: [['id', 'ASC'], [{model: Review}, 'id', 'ASC']],
    });
    if(data.length) {
      res.send(data);
    } else {
      res.status(400).send("No products to show.");
    }
  } catch (error) {
    next(error);
  }
}


async function getProductById(req,res,next) {
  try {
    const productById = await Product.findByPk(req.params.id, {
      include: Review,
      order: [['id', 'ASC']]
    });
    if (productById) {
      res.send(productById);
    } else {
      res.status(400).send("No product found.");
    }
  } catch (error) {
    next(error);
  }
}


async function createNewProduct(req,res,next) {
  try {
    const newProduct = await Product.create(req.body);
    res.send(newProduct);
  } catch (error) {
    next(error);
  }
}


async function updateProductById(req,res,next) {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    })
    res.send(updatedProduct[1][0]);
  } catch (error) {
    next(error);
  }
}

// For handling the image upload and update of database information
async function updateProductImageURL(req,res,next) {
  try {
    const image = req.file.path;
    const productAfterCoverUpdate = await Product.update({image}, {
      where: {
        id: req.params.id
      },
      returning: true
    });
    res.send(productAfterCoverUpdate[1][0]);
  } catch (error) {
    next(error);
  }
}


async function deleteProductById(req,res,next) {
  try {
    await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}


const products = {
  getAllProducts, getProductById, createNewProduct, updateProductById, deleteProductById, updateProductImageURL
}

export default products;