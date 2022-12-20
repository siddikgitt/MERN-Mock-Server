const mongoose = require("mongoose")
const randomSchema = new mongoose.Schema({
    name:{type:String,required:true},
    level:{type:String,required:true},
    score:{type:Number,required:true}
})
const randomModel = mongoose.model("random",randomSchema)

module.exports = randomModel