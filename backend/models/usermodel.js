const mongoose=require('mongoose');

const userschema=new mongoose.Schema({
    name:String,
    email:String,
    number:Number,
    password:String
})

const usermodel=new mongoose.model('userslist',userschema)

module.exports=usermodel