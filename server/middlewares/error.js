class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorMiddleware = (error, request, response, next) => {
  (error.message = error.message || "Internal server error"),
    (error.statusCode = error.statusCode || 500);

  if (error.name === "CaseError") {
    const message = `Resource not found. Invaiid ${error.path}`;
    error = new ErrorHandler(message, 400);
  }

  if (error.code === 11000) {
    const message = `Duplicate${Object.keys(error.keyValue)} Entered`;
    error = new ErrorHandler(message, 400);
  }

  // if (error.name === "JsonWebTokenError") {
  //   const message = `Json web Token is Invalid , Try again`;
  //   error = new ErrorHandler(message, 400);
  // }

  if (error.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, Try again`;
    error = new ErrorHandler(message, 400);
  }

  return response.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};

module.exports = ErrorHandler;
