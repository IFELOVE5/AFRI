const mongoose = require(`mongoose`)

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        //match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, `invalid email format`]
    },

    password: {
        type: String,
        required: true
    
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
})

userSchema.virtual(`id`).get(function(){
   return this._id.toHexString()
})

userSchema.set(`toJSON`, {virtuals: true})

const userModel = mongoose.model("User", userSchema)
module.exports = userModel