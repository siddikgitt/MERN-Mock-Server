const mongoose = require("mongoose")
const listSchema = new mongoose.Schema({
    title:{type:String,required:true},
    quantity:{type:Number,required:true},
    priority:{type:Number,required:true},
    dateandtimestamp:{type:String,required:true},
    description:{type:String,required:true}
})
const listModal= mongoose.model("list",listSchema)
module.exports = listModal