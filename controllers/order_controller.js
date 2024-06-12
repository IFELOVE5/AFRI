const mongoose = require("mongoose");

const Order = require(`../models/order`)

const Product = require(`../models/product`)

exports.getAll = async (req, res, next) => {

   try {
   const orders = await Order.find()

    if (orders === 0) {
        return res.status(404).json({
            message: `order list is empty`
    })}

    const count = await Order.countDocuments()

    return res.status(200).json({total: count, orders
        }
    )

   } catch (error) { 
    console.error(error); 
    return res.status(500).json({
    message: `an internal error occured`
   })
    
   }
},

exports.addOrder = async(req, res, next) => {
    const {quantity, product} = req.body
    if ( !quantity || !product ) {
        return res.status(400).json({
            message: `all fields are required`
    })
    }

    try {

        if (!mongoose.isValidObjectId(product)) {
            return res.status(400).json({
                message: `Invalid product ID`
            });
        }


        const verifiedProduct = await Product.findById( product )

        if (!verifiedProduct) {
            return res.status(409).json({
                message: `product doesn't exists`
        }) }

        const existing = await Order.findOne({product, quantity})

        if (existing) {
            return res.status(409).json({
                message: `order already exists`
        })
        }
         
        const order = new Order ({
            product,
            quantity
        })

        const savedOrder = await order.save()

        if (!savedOrder) {
            return res.status(402).json({
                message: `order not created`
        })
        }

        return res.status(201).json({
            status: true,
            message: `order created`,
            savedOrder
    })

    } catch (error) {
        console.error(error); 
    return res.status(500).json({
    message: `an internal error occured`
   })
    }
},


exports.getOrder = async(req, res, next)=> {
const orderId = req.params.id

try {
    if (!mongoose.isValidObjectId(orderId)) { 
        return res.status(404).json({
            message: `order Id is invalid`
    })
    }

   const order = await Order.findById(orderId).populate(`product`, `name price`)
   if (!order) {
    return res.status(404).json({
        message: `order id doesn't exist`
})
   }

   return res.status(200).json(order)
    
} catch (error) {
    console.error(error); 
    return res.status(500).json({
    message: `an internal error occured`
   })
    
    
}
}

exports.updateOrder = async(req, res, next)=> {
    const orderId = req.params.id
    const {product, quantity} = req.body
    
    try {
        if (!mongoose.isValidObjectId(orderId)) { 
            return res.status(404).json({
                message: `order Id is invalid`
        })
        }
    
       const order = await Order.findByIdAndUpdate(orderId, {product, quantity}, {new: true}).populate(`product`, `name price`)
       if (!order) {
        return res.status(404).json({
            message: `order couldn't update, id is wrong`
    })
       }
    
       return res.status(200).json({message: `order updated succesfully`, order})
        
    } catch (error) {
        console.error(error); 
        return res.status(500).json({
        message: `an internal error occured`
       })
        
        
    }
    },

exports.deleteOrder = async(req, res, next)=> {
    const orderId = req.params.id
        
    try {
         if (!mongoose.isValidObjectId(orderId)) { 
                return res.status(404).json({
                    message: `order Id is invalid`
            })
            }
        
           const order = await Order.findByIdAndDelete(orderId)
           if (!order) {
            return res.status(404).json({
                message: `order id doesn't exist`
        })
           }
        
           return res.status(200).json({message: `order deleted successfully`})
            
        } catch (error) {
            console.error(error); 
            return res.status(500).json({
            message: `an internal error occured`
           })
            
            
        }
},
exports.deleteManyOrder = async(req, res, next)=> {
   
        
    try {
           const order = await Order.deleteMany({quantity: 9})
           if (!order) {
            return res.status(404).json({
                message: `orders couldn't delete`
        })
           }
        
           return res.status(200).json({message: `orders deleted successfully`})
            
        } catch (error) {
            console.error(error); 
            return res.status(500).json({
            message: `an internal error occured`
           })
            
            
        }
},

exports.updateManyOrder = async(req, res, next)=> {
        const {product, quantity} = req.body
        
        try {
        
           const order = await Order.updateMany({product: product}, {product, quantity}, {new: true})
           if (!order) {
            return res.status(404).json({
                message: `orders couldn't update`
        })
           }
        
           return res.status(200).json({message: `order updated succesfully`, order})
            
        } catch (error) {
            console.error(error); 
            return res.status(500).json({
            message: `an internal error occured`
           })
            
            
        }
}
