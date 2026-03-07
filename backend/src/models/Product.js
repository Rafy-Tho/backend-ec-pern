import pgPool from "../configs/database.js";

class Product {
  async addProduct(productData) {
    const { title, price, description, quantity, imageUrl } = productData;
    const result = await pgPool.query(
      "INSERT INTO products (title, price, quantity, description, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, price, quantity, description, imageUrl],
    );
    return result.rows[0];
  }
  async getAllProducts() {
    const result = await pgPool.query("SELECT * FROM products");
    return result.rows;
  }
  async getProductById(productId) {
    const result = await pgPool.query(
      "SELECT * FROM products WHERE product_id = $1",
      [productId],
    );
    return result.rows[0];
  }
  async updateProduct(productId, productData) {
    const { title, price, description, quantity, imageUrl } = productData;
    const result = await pgPool.query(
      "UPDATE products SET title = $1, price = $2, quantity = $3, description = $4, image_url = $5 WHERE product_id = $6 RETURNING *",
      [title, price, quantity, description, imageUrl, productId],
    );
    return result.rows[0];
  }
  async deleteProduct(productId) {
    const result = await pgPool.query(
      "DELETE FROM products WHERE product_id = $1 RETURNING *",
      [productId],
    );
    return result.rows[0];
  }
  async addProductCategory(productId, categoryId) {
    const result = await pgPool.query(
      "INSERT INTO products_categories (product_id, category_id) VALUES ($1, $2) RETURNING *",
      [productId, categoryId],
    );
    return result.rows[0];
  }
  async getProductCategory(productId, categoryId) {
    const result = await pgPool.query(
      "SELECT * FROM products_categories WHERE product_id = $1 AND category_id = $2",
      [productId, categoryId],
    );
    return result.rows[0];
  }
}

const productModel = new Product();

export default productModel;
