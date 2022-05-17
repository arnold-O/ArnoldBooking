
const express = require("express");

const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const hotelRouter = require("./routes/hotelRoutes");
const roomRouter = require("./routes/roomRoutes");

const errorMiddleware = require("./middlewares/errors");
const ErrorHandler = require("./utils/errorhandler");
const cookieParser = require("cookie-parser");



const app = express();






// creating a middleware
// app.use((req, res, next)=>{
//   console.log('hello from here')
//   next();

// })




// this act as a middleware
app.use(express.json());
app.use(cookieParser());




// mouting Multiple router
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/hotel", hotelRouter)
app.use("/rooms", roomRouter);

  


app.all("*", (req, res, next) => {
  next(new ErrorHandler(`cant find ${req.originalUrl} on this server`, 404));
});


app.use(errorMiddleware);


// listen to particular port and server
module.exports = app;
