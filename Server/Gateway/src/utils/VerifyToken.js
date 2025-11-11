import jwt from "jsonwebtoken";

export const VerifyToken = (token) => {
  const res = jwt.verify(token, process.env.JWT_SECRET);
  return res;
};
