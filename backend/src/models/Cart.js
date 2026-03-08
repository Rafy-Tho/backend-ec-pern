import pgPool from "../configs/database.js";

class Cart {
  async addToCart(cartId, productId, quantity) {
    const result = await pgPool.query(
      "INSERT INTO cart_products (cart_id, product_id, cart_quantity) VALUES ($1, $2, $3) RETURNING *",
      [cartId, productId, quantity],
    );
    return result.rows[0];
  }
  async getCartByUserId(userId) {
    const result = await pgPool.query(
      "INSERT INTO carts (user_id) VALUES ($1) ON CONFLICT (user_id) DO UPDATE SET user_id = carts.user_id RETURNING *",
      [userId],
    );
    return result.rows[0];
  }
  async getCartProducts(cartId) {
    const result = await pgPool.query(
      "SELECT cart_products.cart_quantity, products.product_id, products.title, products.price, products.image_url, products.description, products.quantity FROM cart_products JOIN products ON cart_products.product_id = products.product_id WHERE cart_id = $1",
      [cartId],
    );
    return result.rows;
  }
  async removeFromCart(cartId, productId) {
    const result = await pgPool.query(
      "DELETE FROM cart_products WHERE cart_id = $1 AND product_id = $2 RETURNING *",
      [cartId, productId],
    );
    return result.rows[0];
  }
  async clearCart(cartId) {
    const result = await pgPool.query(
      "DELETE FROM cart_products WHERE cart_id = $1 RETURNING *",
      [cartId],
    );
    return result.rows;
  }
  async updateCartProductQuantity(cartId, productId, quantity) {
    const result = await pgPool.query(
      "UPDATE cart_products SET cart_quantity = $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *",
      [quantity, cartId, productId],
    );
    return result.rows[0];
  }
}
const cartModel = new Cart();

export default cartModel;
