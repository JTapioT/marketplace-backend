import models from "../../db/models/index.js";
const { Product, ProductCategory, Review, Category, User } = models;
import sequelize from "sequelize";
const {Op} = sequelize;


// I tried to figure out how to separate the concerns even more and from this link
// https://www.bezkoder.com/node-express-sequelize-postgresql/#Create_the_Controller
// I don't know much about Model-View-Controller approach but I guess the folder name 'controllers' would imply that this is where the process of modifying data suitable for database insert is handled. Also, response is being sent here.
// I tried similar approach

// Offset: Eg. size is 10 and offset 0, then product rows from 0-10 will be shown from all of the product rows.
// If size is 20 and offset is 10, then products from 10-20 will be shown from all of the product rows. 
// Hence, this way there is pagination available.
// Limit: Limits the amount of products provided
// Page amount is dependant on limit size. Eg. limit of 10 would mean out of 85 products in total that the page amount is 8.5. With Math.ceil() we top the amount of pages to 9 in total.



export async function findAllProducts(req, res) {
  try {
    const { count, rows } = await Product.findAndCountAll({
      include: [
        {
          model: Category,
          through: { model: ProductCategory, attributes: [] },
          ...(req.query.category && {
            where: { name: { [Op.iLike]: `%${req.query.category}%` } },
          }),
          attributes: { exclude: ["id", "updatedAt", "createdAt"] },
        },
        {
          model: Review,
          include: [
            {
              model: User,
              attributes: {
                exclude: ["id", "updatedAt", "createdAt", "email"],
              },
            },
          ],
          attributes: {
            exclude: ["id", "updatedAt", "createdAt", "productId", "userId"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      where: {
        ...(req.query.name && {
          name: {
            [Op.iLike]: `%${req.query.name}%`,
          },
        }),
        ...((req.query.gt || req.query.lt) && {price: {
          ...((req.query.gt && { [Op.gt]: req.query.gt }) || {}),
          ...((req.query.lt && { [Op.lt]: req.query.lt }) || {}),
        }}),
      },
      limit: req.query.limit,
      offset: req.query.page > 0 ? ((req.query.limit * req.query.page) - req.query.limit) : 0,
      //order: [["createdAt", "ASC"]],
    });
    if (rows.length) {
      res.send({total: count, pages: Math.ceil(count / req.query.limit)-1, data: rows});
    } else {
      res.status(400).send("No products to show.");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function findOneProduct(req, res) {
  try {
    const productById = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          through: { model: ProductCategory, attributes: [] },
          attributes: { exclude: ["id", "updatedAt", "createdAt"] },
        },
        {
          model: Review,
          include: [{model: User, attributes: {exclude:["id", "email", "createdAt", "updatedAt"]}}],
          attributes: {
            exclude: ["id", "createdAt", "updatedAt", "productId", "userId"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["id", "ASC"]],
    });
    if (productById) {
      res.send(productById);
    } else {
      res.status(400).send("No product found.");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function createProduct(req, res) {
  try {
    //
    // Get id from creating a new product
    // Insert product category(s) into category table - get id(s) back
    // Insert to categoryProduct the productId and categoryId

    const { category, ...productInformation } = req.body;
    const newProduct = await Product.create(productInformation);

    // If categories is an array eg. ['phone', 'electronics']
    if (Array.isArray(category) && category.length) {
      let categories = category.map((categoryName) => {
        return { name: categoryName };
      });
      let insertedRecordsToCategory = await Category.bulkCreate(categories);
      let categoryIds = insertedRecordsToCategory.map((category) => {
        return {
          productId: newProduct.id,
          categoryId: category.dataValues.id,
        };
      });
      await ProductCategory.bulkCreate(categoryIds);
    } else {
      // Category comes as a string value eg. 'phone'
      let insertedRecordToCategory = await Category.create({ name: category });
      await ProductCategory.create({
        productId: newProduct.id,
        categoryId: insertedRecordToCategory.id,
      });
    }
    res.send(newProduct);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function updateProduct(req, res) {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.send(updatedProduct[1][0]);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function deleteProduct(req, res) {
  try {
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).send();
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}


