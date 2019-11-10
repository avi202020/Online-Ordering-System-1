const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/UserSchema");

// ==============================================
// @desc      Login user
// @route     POST /auth/login
// @access    Public
// ==============================================
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // validate email and password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for user
  // need password to return
  const findUser = await User.findOne({ email }).select("+password");

  if (!findUser) {
    return next(new ErrorResponse("Invalid credentials: user doesn't exist", 401));
  }

  // Check if password matches
  const isMatch = await findUser.validatePassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials: wrong password", 401));
  }

  sendTokenResponse(findUser, 200, res)
});


// ==============================================
// @desc      Register user
// @route     POST /auth/register
// @access    Public
// ==============================================
exports.register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  // get the content from body, password not encrypted
  // console.log(firstName, lastName, email, password)

  // create user instance
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password
  });

  sendTokenResponse(newUser, 200, res)
});


// ==============================================
// @desc      Get current logged in user
// @route     POST /auth/me
// @access    Private
// ==============================================
exports.getMe = asyncHandler(async(req,res,next)=>{
  // console.log(req)
  const getUser = await User.findById(req.user._id)

  res.status(200).json({ success: true, data: getUser})
})




/**
    Get token from model, create cookie and send response
 */
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  // secure flag in cookie, send to https
  if (process.env.NODE_ENV === 'production') {
    options.secure = true
  }

  res
    .status(statusCode)
    // (key, value, options)
    .cookie("token", token, options)
    .json({ success: true, token });
};
