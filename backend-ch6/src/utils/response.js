// Standarize response
exports.successResponse = (res, data, message = "Operation Successful") => {
  res.status(200).json({
      success: true,
      message,
      data,
  });
};
