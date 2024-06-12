const express  = require("express");

const checkAuth = require(`../Helpers/jwt.js`)

const multer = require(`multer`)

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, `uploads`)
    },
    filename: function(req, file, cb){
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === `image/jpeg`|| file.mimetype === `image/png` || file.mimetype === `image/jpg` ) {
        cb(null, true)  
    } else{
        cb(new Error(`invalid image type`), false)}
    
}

const upload = multer({storage: storage, 
    limits: {
    fileSize: 1024 * 1024 * 5},
    fileFilter: fileFilter

})

const { getAll, getProduct, addProduct, updateProduct, deleteProduct, updateManyProduct, deleteManyProduct } = require("../controllers/product_controller");

productRoute = express.Router()

productRoute.get(`/all`, getAll)

productRoute.get(`/:id`, getProduct)

productRoute.post(`/add`, upload.single(`productImage`), addProduct)

productRoute.put(`/:id`, updateProduct)

productRoute.put(`/update`, updateManyProduct)

productRoute.delete(`/delete/:id`, deleteProduct)

productRoute.delete(`/delete`, deleteManyProduct)

module.exports= productRoute