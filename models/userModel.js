const mongoose = require('mongoose')
const Schema = mongoose.Schema;
let userSchema = new Schema({
name:{type:String,required:true},
email:{type:String,required:true},
password:{type:String,required:true},
profilePic:{type:String},
id:{type:String}
});
module.exports = mongoose.model('userModel',userSchema)