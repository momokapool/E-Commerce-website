const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    isBlocked: {
        type: Boolean,
        default: false
    },

    cart: {
        type: Array,
        default: []
    },
    address: [{type: mongoose.Schema.Types.ObjectId, ref: "Address"}],
    wishlist: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
    refreshToken: {
        type: String
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExxpire: Date
},
{
    timestamps: true  //Saves createdAt and updatedAt as dates. Creates 
})

/*userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}; */

userSchema.method.createPasswordResetToken = async function () {
    const resettoken = crypto.randomBytes(32).toString("hex")
    this.passwordResetToken = crypto.createHash("sha256").update(resettoken).digest("hex");
    this.passwordResetExxpire = Date.now() + 30 * 60 * 1000
    return resettoken 
}



module.exports = mongoose.model("User", userSchema)
