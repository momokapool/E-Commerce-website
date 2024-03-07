const mongoose = require('mongoose')

var BrandSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model("Brand", BrandSchema)