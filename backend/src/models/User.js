import pgPool from "../configs/database.js";

class User {
  async register(userData) {
    const { firstName, lastName, email, password, username } = userData;
    const result = await pgPool.query(
      "INSERT INTO users (first_name, last_name, email, user_password, username) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [firstName, lastName, email, password, username],
    );

    return result.rows[0];
  }

  async login(userData) {
    const { email, password } = userData;
    const result = await pgPool.query(
      "SELECT * FROM users WHERE email = $1 AND user_password = $2",
      [email, password],
    );
    return result.rows[0];
  }
  async findByEmail(email) {
    const result = await pgPool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  }
  async updateProfile(userId, userData) {
    const { firstName, lastName, username } = userData;
    const result = await pgPool.query(
      "UPDATE users SET first_name = $1, last_name = $2, username = $3 WHERE user_id = $4 RETURNING *",
      [firstName, lastName, username, userId],
    );
    return result.rows[0];
  }
  async updatePassword(userId, newPassword) {
    const result = await pgPool.query(
      "UPDATE users SET user_password = $1 WHERE user_id = $2 RETURNING *",
      [newPassword, userId],
    );
    return result.rows[0];
  }
  async resetPassword(userId, newPassword) {
    const result = await pgPool.query(
      "UPDATE users SET user_password = $1 WHERE user_id = $2 RETURNING *",
      [newPassword, userId],
    );
    return result.rows[0];
  }
  async getProfile(userId) {
    const result = await pgPool.query(
      "SELECT user_id, first_name, last_name, email, username FROM users WHERE user_id = $1",
      [userId],
    );
    return result.rows[0];
  }
}

const userModel = new User();
export default userModel;
