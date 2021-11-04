import models from "../../db/models/index.js";
import productsRouter from "./routes.js";
const { Product, Review, Category, ProductCategory } = models;


//TODO: Find out later why include does not work - for some reason exclude only works for attributes. 

async function getAllProducts(req,res,next) {
  try {
    const data = await Product.findAll({
      include: [
        {model: Category, through: {model: ProductCategory, attributes: []}, attributes: {exclude: ['id', 'updatedAt','createdAt']}}, 
        {model: Review, attributes: {exclude: ['id','updatedAt', 'createdAt', 'productId', 'userId']}}
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
    order: [['createdAt','ASC']]
    });
    if(data.length) {
      res.send(data);
    } else {
      res.status(400).send("No products to show.");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}




async function getProductById(req,res,next) {
  try {
    const productById = await Product.findByPk(req.params.id, {
      include: [
        {model: Category, through: {model: ProductCategory, attributes: []}, attributes: {exclude: ['id', 'updatedAt','createdAt']}},
        {model: Review, attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'productId', 'userId']}}
      ],
      attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
      order: [['id', 'ASC']]
    });
    if (productById) {
      res.send(productById);
    } else {
      res.status(400).send("No product found.");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

// TODO: Take later away the redundant console logs!!
async function createNewProduct(req,res,next) {
  try {
    // Get id from creating a new product
    // Insert product category into category table - get id back
    // Insert to categoryProduct the productId and categoryId

    const {category, ...productInformation} = req.body;
    const newProduct = await Product.create(productInformation);

    if(Array.isArray(category) && category.length) {
      // TODO: DO AFTER DEBRIEF!
      // Insert into category, one by one
      // With returned id's - similarly do the same to join table, one by one
    }
    const productToCategory = await Category.create({name: category});
    console.log("Product id:");
    console.log(newProduct.id);
    console.log("Category id:");
    console.log(productToCategory.id);
    const addToJoinTable = await ProductCategory.create({productId: newProduct.id, categoryId: productToCategory.id});
    console.log("Newly created information within productCategory table:");
    console.log(addToJoinTable);
    res.send(newProduct);
  } catch (error) {
    console.log(error);
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