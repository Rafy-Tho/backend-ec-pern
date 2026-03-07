import pgPool from "../configs/database.js";

class Code {
  async addCode(code, userId, expiresAt) {
    const result = await pgPool.query(
      "INSERT INTO password_reset_codes (code, user_id, expires_at) VALUES ($1, $2, $3) RETURNING *",
      [code, userId, expiresAt],
    );
    return result.rows[0];
  }
  async verifyCode(code, userId) {
    const result = await pgPool.query(
      "SELECT * FROM password_reset_codes WHERE code = $1 AND user_id = $2 and used = FALSE",
      [code, userId],
    );
    return result.rows[0];
  }
  async deleteCode(code, userId) {
    const result = await pgPool.query(
      "UPDATE password_reset_codes SET used = TRUE WHERE code = $1 AND user_id = $2 RETURNING *",
      [code, userId],
    );
    return result.rows[0];
  }
}
const codeModel = new Code();

export default codeModel;
