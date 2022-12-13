const mongoose = require("mongoose")
const connect = () => {
    return mongoose.connect("mongodb+srv://siddik:1234@cluster0.jmukqzl.mongodb.net/?retryWrites=true&w=majority")
}
module.exports = connect