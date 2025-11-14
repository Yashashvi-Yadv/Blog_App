// this file verify the jwt token
// if it is a valid user then move forward otherwise it return from gateway
// no need to send req to the microservices

import { VerifyToken } from "../utils/VerifyToken.js";

// these route do not need any type of authentication
const publicRoutes = ["/api/auth/register", "/health"];

export const jwtAuthMiddleware = (req, res, next) => {
  if (publicRoutes.some((path) => req.path.startsWith(path))) {
    return next();
  }

  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = VerifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
