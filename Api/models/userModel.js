const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true , 'please tell us your name'],
        unique:true
    },
    email:{
        type:String,
        unique:true,
        required: [true , 'please tell us your name'],
        lowercase:true,
        validate: [validator.isEmail, 'please provide a valid email'],
      
    },
    isAdmin:{
        type:Boolean,
        default:false,
       
    },
  
    password:{
        type:String,
        required: [true, 'please provide a password'],
        minlength: 5,
        select: false,
    },
   
  
}, {timestamps:true})


userSchema.pre('save', async function(next){

    if(!this.isModified("password")){

        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()

})
userSchema.methods.correctPassword = async function (enteredPassword) {
    return await bcrypt.compare(`${enteredPassword}`, this.password);
  };
  






const User = mongoose.model('User', userSchema)
module.exports = User