const mongoose = require(`mongoose`)

const Schema = mongoose.Schema 

const productSchema = new Schema({

    name:{
        type: String,
        required: true
    },

    price:{
        type: String,
        required: true
    },

    productImage: {
        type: String
    }
},

    { timestamps: true
    }
)


productSchema.virtual(`id`).get(function () {
    return this._id.toHexString
})
productSchema.set(`toJSON`, {virtuals:true})


const productModel = mongoose.model("Product", productSchema)
module.exports = productModel