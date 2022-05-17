const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Hotel = require("../models/hotel");
const ErrorHandler = require("../utils/errorhandler");

exports.createHotel = async (req, res, next) => {
  try {
    const newHotel = await Hotel.create(req.body);

    if (!newHotel)
      return next(new ErrorHandler("the parameters are needed", 400));
    res.status(200).json({
      meassage: "sucess",
      newHotel,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateHotel = catchAsyncErrors(async (req, res, next) => {
  const updatehotel = await Hotel.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updatehotel) {
    return next(new ErrorHandler("hotel not found", 400));
  }

  res.status(200).json({
    message: "success",
    updatehotel,
  });
});
exports.deleteHotel = catchAsyncErrors(async (req, res, next) => {
  const updatehotel = await Hotel.findByIdAndDelete(req.params.id);

  if (!updatehotel) {
    return next(new ErrorHandler("invalid hotel to delete", 400));
    // return next(new ErrorHandler('no Hotel found', 400))
  } else {
    await updatehotel.remove();
  }
  res.status(200).json({
    message: "success, hotel deleted",
  });
});

exports.getAllHotel = catchAsyncErrors(async (req, res, next) => {
  const getallhotel = await Hotel.find();

  if (!getallhotel) {
    return next(new ErrorHandler("No hotel found with this ID", 404));
  }

  return res.status(400).json({
    message: "success",
    getallhotel,
  });
});

exports.getOneHotel = catchAsyncErrors(async (req, res, next) => {
  const singleHotel = await Hotel.findById(req.params.id);

  if (!singleHotel) {
    return next(new ErrorHandler("No hotel found with this ID", 404));
  }

  return res.status(400).json({
    message: "success",
    singleHotel,
  });
});
