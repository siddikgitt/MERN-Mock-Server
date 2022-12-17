const mongoose = require("mongoose")
const jobSchema = new mongoose.Schema({
    company:{type:String,required:true},
    city:{type:String,required:true},
    location:{type:String,required:true},
    role:{type:String,required:true},
    level:{type:String,required:true},
    position:{type:String,required:true},
    language:{type:String,required:true},
    contract :{type:String,required:true},
},{ timestamps: true })
const jobModel = mongoose.model("job",jobSchema)

module.exports = jobModel