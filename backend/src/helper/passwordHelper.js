import bcrypt from "bcrypt";

class PasswordHelper {
  // Hash password
  async hashPassword(password) {
    const saltRounds = 12; // security level
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  // Compare password
  async comparePassword(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
}

const passwordHelper = new PasswordHelper();

export default passwordHelper;
