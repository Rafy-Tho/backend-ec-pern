import ApiError from "./ApiError.js";

function notFound(req, res, next) {
  return next(new ApiError(404, `Not Found ${req.originalUrl}`));
}

export default notFound;
