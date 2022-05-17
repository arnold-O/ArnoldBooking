const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Hotel = require("../models/hotel");
const Room = require("../models/room");
const ErrorHandler = require("../utils/errorhandler");

exports.createRooms = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const { title, price, desc, roomNumbers,  maxPeople} = req.body;

  const newRoom = await Room.create({
    title,
    price,
    desc,
    roomNumbers,
    maxPeople
  });

  if ((!title || !price || !desc || !maxPeople || !roomNumbers))
    return next(new ErrorHandler("please input  data ", 404));

  await Hotel.findByIdAndUpdate(id, { $push: { rooms: newRoom._id } });

  res.status(201).json({
    message: "room created successfully",
    newRoom,
  });
});

exports.updateRoom = catchAsyncErrors(async (req, res, next) => {
  const updateRoom = await Room.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updateRoom) {
    return next(new ErrorHandler("hotel not found", 400));
  }

  res.status(200).json({
    message: "success",
    updateRoom,
  });
});
exports.deleteRoom = catchAsyncErrors(async (req, res, next) => {
  const {hotelid} = req.params
  const updateRoom = await Room.findByIdAndDelete(req.params.id);

  if (!updateRoom) {
    return next(new ErrorHandler("invalid hotel to delete", 400));
    // return next(new ErrorHandler('no Hotel found', 400))
  } else {
    await  await Hotel.findByIdAndUpdate(hotelid, { $pull: { rooms: req.params.id } });
  }
  res.status(200).json({
    message: "success, room deleted",
  });
});

exports.getAllRoom = catchAsyncErrors(async (req, res, next) => {
  const getallRoom = await Room.find();

  if (!getallRoom) {
    return next(new ErrorHandler("No hotel found with this ID", 404));
  }

  return res.status(400).json({
    message: "success",
    getallRoom,
  });
});

exports.getOneRoom = catchAsyncErrors(async (req, res, next) => {
  const singleRoom = await Room.findById(req.params.id);

  if (!singleRoom) {
    return next(new ErrorHandler("No hotel found with this ID", 404));
  }

  return res.status(400).json({
    message: "success",
    singleRoom,
  });
});
