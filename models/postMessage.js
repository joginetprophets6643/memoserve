const mongoose =  require("mongoose");
const Schema = mongoose.Schema;
let postSchema = new Schema({
    title:String,
    message:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    likeCount:{
        type:Number,
        default:0,
    },
    createdAt:{
        type:Date,
        default:new Date(),
    },
})
module.exports  = mongoose.model('postMessage',postSchema);
