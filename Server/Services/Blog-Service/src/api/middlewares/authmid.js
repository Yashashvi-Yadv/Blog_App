import userToken from "../../core/utils/user.token.js";

export const authmid = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token)
    return res.status(401).json({ message: "No token, unauthorized" });

  const decoded = userToken.verifytoken(token);

  if (!decoded)
    return res.status(403).json({ message: "Invalid or expired token" });

  req.user = decoded; // attach decoded user info to request
  next();
};
