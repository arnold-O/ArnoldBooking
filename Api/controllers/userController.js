const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const User = require("../models/userModel")
const ErrorHandler = require("../utils/errorhandler")





exports.updateUser = catchAsyncErrors(  async (req, res, next)=>{
   

        const updateuser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, { new: true,})

        if(!updateuser){
            return  next(new ErrorHandler('hotel not found', 400))
        }

        res.status(200).json({
            message:"success",
            updateuser

        })
        
 
})
exports.deleteUser =  catchAsyncErrors( async (req, res, next)=>{
    

        const updateuser = await User.findByIdAndDelete(req.params.id)

        if(!updateuser){
            return  next(new ErrorHandler('invalid hotel to delete', 400))
            // return next(new ErrorHandler('no Hotel found', 400))
        }else{
            await updateuser.remove();
        }
        res.status(200).json({
            message:"success, hotel deleted",
           
        })
        
  
})


exports.getAllUser= async (req, res, next)=>{

    const getalluser = await User.find()


    res.status(200).json({
        message:"success",
        getalluser
    })
}


exports.getOneUser = async (req, res, next)=>{

try {
    
    const singleuser = await User.findById(req.params.id)


    return  res.status(400).json({
        message:"success",
        singleuser
    })
} catch (error) {
    next(error)
    
}


}