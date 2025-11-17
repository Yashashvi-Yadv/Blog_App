export const errorMiddleware = (err, req, res, next) => {
  console.error("Like error", err.message);
  if (res.headersSent) return next(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
