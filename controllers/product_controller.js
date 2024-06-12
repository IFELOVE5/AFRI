const mongoose = require(`mongoose`)

const Product = require(`../models/product`)

exports.getAll = async (req, res, next) => {

   try {
   const products = await Product.find()

    if (products === 0) {
        return res.status(404).json({
            message: `product list is empty`
    })}

    const count = await Product.countDocuments()

    return res.status(200).json({total: count, products
        }
    )

   } catch (error) { 
    console.error(error); 
    return res.status(500).json({
    message: `an internal error occured`
   })
    
   }
},

exports.addProduct = async(req, res, next) => {
   
    const {name, price} = req.body
    if (!name || !price ) {
        return res.status(400).json({
            message: `all fields are required`
    })
    }

    try {
        const existing = await Product.findOne({name, price})

        if (existing) {
            return res.status(409).json({
                message: `product already exists`
        })
        }
        const existing2 = await Product.findOne({name})

        if (existing2) {
            return res.status(409).json({
                message: `product already exists`
        })
        }
         
        const product = new Product ({
            name,
            price,
            productImage: req.file.path
        })

        savedProduct = await product.save()

        if (!savedProduct) {
            return res.status(402).json({
                message: `product not created`
        })
        }

        return res.status(201).json({
            status: true,
            message: `product created`,
            savedProduct
    })

    } catch (error) {
        console.error(error); 
    return res.status(500).json({
    message: `an internal error occured`
   })
    }
}


exports.getProduct = async(req, res, next)=> {
const productid = req.params.id

try {
    if (!mongoose.isValidObjectId(productid)) { 
        return res.status(404).json({
            message: `product Id is invalid`
    })
    }

   const product = await Product.findById(productid)
   if (!product) {
    return res.status(404).json({
        message: `product id doesn't exist`
})
   }

   return res.status(200).json(product)
    
} catch (error) {
    console.error(error); 
    return res.status(500).json({
    message: `an internal error occured`
   })
    
    
}
},

exports.updateProduct = async(req, res, next)=> {
    const productid = req.params.id
    const {name, price} = req.body
    
    try {
        if (!mongoose.isValidObjectId(productid)) { 
            return res.status(404).json({
                message: `product Id is invalid`
        })
        }
    
       const product = await Product.findByIdAndUpdate(productid, {name, price}, {new: true})
       if (!product) {
        return res.status(404).json({
            message: `product couldn't update, id is wrong`
    })
       }
    
       return res.status(200).json({message: `product updated succesfully`, product})
        
    } catch (error) {
        console.error(error); 
        return res.status(500).json({
        message: `an internal error occured`
       })
        
        
    }
    },

exports.deleteProduct = async(req, res, next)=> {
    const productid = req.params.id
        
    try {
         if (!mongoose.isValidObjectId(productid)) { 
                return res.status(404).json({
                    message: `product Id is invalid`
            })
            }
        
           const product = await Product.findByIdAndDelete(productid)
           if (!product) {
            return res.status(404).json({
                message: `product id doesn't exist`
        })
           }
        
           return res.status(200).json({message: `product deleted successfully`})
            
        } catch (error) {
            console.error(error); 
            return res.status(500).json({
            message: `an internal error occured`
           })
            
            
        }
},
exports.deleteManyProduct = async(req, res, next)=> {
   
        
    try {
           const product = await Product.deleteMany({name: "headset"})
           if (!product) {
            return res.status(404).json({
                message: `product couldn't delete`
        })
           }
        
           return res.status(200).json({message: `product deleted successfully`})
            
        } catch (error) {
            console.error(error); 
            return res.status(500).json({
            message: `an internal error occured`
           })
            
            
        }
},

exports.updateProduct = async(req, res, next)=> {
 const productid = req.params.id
 const {name, price} = req.body
    
    try {
    if (!mongoose.isValidObjectId(productid)) { 
    return res.status(404).json({
        message: `product Id is invalid`
        })
        }
    
       const product = await Product.findByIdAndUpdate(productid, {name, price}, {new: true})
       if (!product) {
        return res.status(404).json({
            message: `product couldn't update, id is wrong`
    })
       }
    
       return res.status(200).json({message: `product updated succesfully`, product})
        
    } catch (error) {
        console.error(error); 
        return res.status(500).json({
        message: `an internal error occured`
       })
        
        
    }
},

exports.updateManyProduct = async(req, res, next)=> {
        const {name, price} = req.body
        
        try {
        
           const product = await Product.updateMany({name: /headset/}, {name, price}, {new: true})
           if (!product) {
            return res.status(404).json({
                message: `products couldn't update`
        })
           }
        
           return res.status(200).json({message: `product updated succesfully`, product})
            
        } catch (error) {
            console.error(error); 
            return res.status(500).json({
            message: `an internal error occured`
           })
            
            
        }
}
