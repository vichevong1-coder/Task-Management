const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.error(err.stack);

  if (err.name === "CastError") {
    const message = "resource not found";
    error = { statusCode: 404, message };
  }

  if (err.code === 11000) {
    const failedField = Object.keys(err.keyValue)[0];
    const message = `Duplicate field value entered for ${failedField}`;
    error = { statusCode: 400, message };
  }
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error = { statusCode: 400, message };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = { notFound, errorHandler };
