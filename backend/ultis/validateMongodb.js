const mongoose = require('mongoose')
const validateMongo = (id) =>{
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if(!isValid){
        throw new Error("Invalid ID")
    }
}
module.exports = {validateMongo}