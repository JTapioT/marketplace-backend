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


async function createNewProduct(req,res,next) {
  try {
    // 
    // Get id from creating a new product
    // Insert product category(s) into category table - get id(s) back
    // Insert to categoryProduct the productId and categoryId

    const {category, ...productInformation} = req.body;
    const newProduct = await Product.create(productInformation);

    // If categories is an array eg. ['phone', 'electronics']
    if(Array.isArray(category) && category.length) {
      let categories = category.map((categoryName) => {
        return {name: categoryName}
      });
      let insertedRecordsToCategory = await Category.bulkCreate(categories);
      let categoryIds = insertedRecordsToCategory.map(category => {
        return {
          productId: newProduct.id,
          categoryId: category.dataValues.id
        }
      });
      await ProductCategory.bulkCreate(categoryIds);
    } else {
    // Category comes as a string value eg. 'phone'
      let insertedRecordToCategory = await Category.create({name: category});
      await ProductCategory.create({productId: newProduct.id, categoryId: insertedRecordToCategory.id});
    }

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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
    next(error);
  }
}


const products = {
  getAllProducts, getProductById, createNewProduct, updateProductById, deleteProductById, updateProductImageURL
}

export default products;