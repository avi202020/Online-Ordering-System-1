const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/UserSchema");

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  // Get token from header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(' ')[1]
  }
  // Get token from cookies
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }
// console.log(req)
  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // currently logined user, add user id to req object
    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

});

// Grant access to specific roles
exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
