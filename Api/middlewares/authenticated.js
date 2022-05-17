const Jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");

 const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(new ErrorHandler("login first to access this resource", 401));
  }
  // const decode = jwt.verify(token, process.env.JWT_SECRET);
  // req.user = await User.findById(decode.id);

  Jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)  return next(new ErrorHandler("token not valid", 401));
     
  
      req.user = user;
      console.log('here')
  
      next();
    })

})





exports.verifyUser = (req, res, next) => {
  isAuthenticatedUser(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(new ErrorHandler("you are not Authorized", 403));
    }
  });
};

exports.verifyAdmin = (req, res, next) => {
   
  isAuthenticatedUser(req, res, () => {
      console.log(req)
    if (req.user.isAdmin) {
      return next();
    } else {
      return next(new ErrorHandler("you are not Authorized", 403));
    }
  });
};