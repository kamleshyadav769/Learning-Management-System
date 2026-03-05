class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);// yeh btata hai ki error kis file aur kis line pe hua hai, isse debugging me help milti hai
  }
}
export default AppError;