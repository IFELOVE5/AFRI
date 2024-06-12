const mongoose = require(`mongoose`)

const Schema = mongoose.Schema

const Product =  require(`./product`)
const orderSchema = new Schema({

    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: `Product`,
        required: true
    },

    quantity:{
        type: Number,
        required: true
    }},
    {timestamps: true}
)

const orderModel = mongoose.model("Order",orderSchema)
module.exports = orderModel