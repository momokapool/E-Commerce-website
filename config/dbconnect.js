const {default : mongoose} = require('mongoose')
const dbconnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URL)
        console.log('database success')
    } catch (error){
        console.log('database error')
    }
}

module.exports = dbconnect