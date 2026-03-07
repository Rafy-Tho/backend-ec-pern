import pgPool from "../configs/database.js";

class Category {
  async addCategory(categoryName) {
    const result = await pgPool.query(
      "INSERT INTO categories (category_name) VALUES ($1) RETURNING *",
      [categoryName],
    );
    return result.rows[0];
  }
  async getAllCategories() {
    const result = await pgPool.query("SELECT * FROM categories");
    return result.rows;
  }
  async getCategoryById(categoryId) {
    const result = await pgPool.query(
      "SELECT * FROM categories WHERE category_id = $1",
      [categoryId],
    );
    return result.rows[0];
  }
  async updateCategory(categoryId, categoryName) {
    const result = await pgPool.query(
      "UPDATE categories SET category_name = $1 WHERE category_id = $2 RETURNING *",
      [categoryName, categoryId],
    );
    return result.rows[0];
  }
  async deleteCategory(categoryId) {
    const result = await pgPool.query(
      "DELETE FROM categories WHERE category_id = $1 RETURNING *",
      [categoryId],
    );
    return result.rows[0];
  }
}

const categoryModel = new Category();

export default categoryModel;
