import pool from "../../db/connect.js";

async function getAllProducts(req,res,next) {
  try {
    const data = await pool.query("SELECT * FROM products ORDER BY id ASC;");
    if(data.rows.length) {
      res.send(data.rows);
    } else {
      res.status(400).send("No products to show.");
    }
  } catch (error) {
    next(error);
  }
}


async function getProductById(req,res,next) {
  try {
    const data = await pool.query("SELECT * FROM products WHERE id=$1;", [req.params.id]);
    if(data.rows.length) {
      res.send(data.rows[0]);
    } else {
      res.status(400).send("Product not found.");
    }
  } catch (error) {
    next(error);
  }
}


async function createNewProduct(req,res,next) {
  try {
    const { name, description, brand, image_url, price, category } = req.body;
    const data = await pool.query(
      "INSERT INTO products(name,description,brand,image_url,price,category) VALUES($1,$2,$3,$4,$5,$6) RETURNING *;",
      [name, description, brand, image_url, price, category]
    );
    res.send(data.rows[0]);
  } catch (error) {
    next(error);
  }
}


async function updateProductById(req,res,next) {
  try {
    const {name, description, brand, image_url, price, category} = req.body;
    const data = await pool.query(
      "UPDATE products SET name=$1, description=$2, brand=$3, image_url=$4, price=$5, category=$6 WHERE id=$7 RETURNING *;",
      [name, description, brand, image_url, price, category, req.params.id]
    );
    res.send(data.rows[0]);
  } catch (error) {
    next(error);
  }
}

// For handling the image upload and update of database information
async function updateProductImageURL(req,res,next) {
  try {
    const image_url = req.file.path;
    const data = await pool.query("UPDATE products SET image_url=$1 WHERE id=$2 RETURNING *;", [image_url, req.params.id]);

    res.send(data.rows[0]);
  } catch (error) {
    
  }
}


async function deleteProductById(req,res,next) {
  try {
    await pool.query("DELETE FROM products WHERE id=$1", [req.params.id]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}


const products = {
  getAllProducts, getProductById, createNewProduct, updateProductById, deleteProductById, updateProductImageURL
}

export default products;