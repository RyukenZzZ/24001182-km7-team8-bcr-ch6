const { NotFoundError } = require("../utils/request");

exports.notFoundURLHandler = (req, res, next) => {
  throw new NotFoundError("URL Not Found");
};

exports.errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const errors = err.errors || [];
  const message = status != 500 ? err.message : "Internal Server Error";
  console.log(err);
  res.status(status).json({
    success: false,
    data: null,
    message,
    errors,
  });
};
