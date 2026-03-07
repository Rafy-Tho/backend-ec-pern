import pgPool from "../configs/database.js";

class Address {
  async addAddress(addressData, userId) {
    const { address_1, address_2, city, state, country, postal_code } =
      addressData;
    const result = await pgPool.query(
      "INSERT INTO user_addresses (user_id, address_1, address_2, city, state, country, postal_code) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [userId, address_1, address_2, city, state, country, postal_code],
    );
    return result.rows[0];
  }
  async changeDefaultAddress(addressId, userId, value) {
    const result = await pgPool.query(
      "UPDATE user_addresses SET is_default_shipping = FALSE WHERE user_id = $1",
      [userId],
    );

    if (result.rowCount === 0) return false;

    const result2 = await pgPool.query(
      "UPDATE user_addresses SET is_default_shipping = $1 WHERE address_id = $2 AND user_id = $3 RETURNING *",
      [value, addressId, userId],
    );
    return result2.rows[0];
  }
  async updateAddress(addressId, userId, addressData) {
    const { address_1, address_2, city, state, country, postal_code } =
      addressData;
    const result = await pgPool.query(
      "UPDATE user_addresses SET address_1 = $1, address_2 = $2, city = $3, state = $4, country = $5, postal_code = $6 WHERE address_id = $7 AND user_id = $8 RETURNING *",
      [
        address_1,
        address_2,
        city,
        state,
        country,
        postal_code,
        addressId,
        userId,
      ],
    );
    return result.rows[0];
  }
  async getAddresses(userId) {
    const result = await pgPool.query(
      "SELECT * FROM user_addresses WHERE user_id = $1",
      [userId],
    );
    return result.rows;
  }
  async deleteAddress(addressId, userId) {
    const result = await pgPool.query(
      "DELETE FROM user_addresses WHERE address_id = $1 AND user_id = $2 RETURNING *",
      [addressId, userId],
    );
    return result.rows[0];
  }
}
const addressModel = new Address();
export default addressModel;
