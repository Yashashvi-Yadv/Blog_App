import jwt from "jsonwebtoken";

class Token {
  createtoken(user) {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  }
  verifytoken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}
export default new Token();
