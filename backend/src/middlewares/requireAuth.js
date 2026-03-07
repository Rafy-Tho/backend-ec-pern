import sessionManager from "../helper/sessionManager.js";
import ApiError from "../utils/ApiError.js";

function requireAuth(req, res, next) {
  console.log(req.session);
  if (!req.session.user) {
    return next(new ApiError(401, "Unauthorized"));
  }

  const isValidSession = sessionManager.validateSession(req);

  if (!isValidSession) {
    return next(new ApiError(401, "Unauthorized"));
  }
  next();
}

export default requireAuth;
