const mongoose = require(`mongoose`)

const User = require(`../models/user.js`)

const argon2 = require(`argon2`)

const jwt = require(`jsonwebtoken`)


exports.signUp = async (req, res, next) => {
    const {email, password} = req.body
    
    console.log(`yes p`)
    if (!email || !password) {
        return res.status(400).json({message: `all fields are required`})   
    }

   /* const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return res.status(400).json({message: `invalid email format`})
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!passwordRegex.test(password)) {
        return res.status(400).json({message: `Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one special character.`})
    }*/

    try {
        const existing = await User.findOne({email})

        if (existing) { return res.status(400).json({message: `user already exists`})}

       const hashedPassword = await argon2.hash(password)

       const user = new User({
        email,
        password: hashedPassword
       })

       savedUser = await user.save()

       if (!savedUser) { return res.status(400).json({message: `couldn't create user`})
       }
        
       return  res.status(201).json({message: `new user created`, email: savedUser.email})
        
    } catch (error) {
        console.error(error); 
        return res.status(500).json({
        message: `an internal error occured`
       })
    }
},

exports.userLogin= async(req, res, next) => {
const {email, password} = req.body
if (!email || !password) {
    return res.status(400).json({message: `all fields are required`})   
}

try {

    const existingUser = await User.findOne({email})
    if (!existingUser) {
        return res.status(401).json({message: `auth failed`})   
    }

    const verifyPassword = await argon2.verify(existingUser.password, password)
    if (!verifyPassword) {
        return res.status(400).json({message: `auth failed`}) 
    }
    

    if (existingUser && verifyPassword) {

        const token= jwt.sign({
            email: existingUser.email,
            id: existingUser._id,
            isAdmin: existingUser.isAdmin
        },
        process.env.JWT_KEY,

        {expiresIn: 86400}
        )
        return res.status(400).json({message: `user login successful`, 
            status: true,
            token:token,
            expiresIn: 86400,
            existingUser
         
        
        }
        ) }

    } catch (error) {
    console.error(error); 
    return res.status(500).json({
    message: `an internal error occured`
    })
}

},

exports.getUsers = async (req, res, next) => {
   
    try {
    const users = await User.find().select(`email`)
 
     if (users === 0) {
         return res.status(404).json({
             message: `users list is empty`
     })}
 
     const count = await User.countDocuments()
 
     return res.status(200).json({total: count, users
         }
     )
 
    } catch (error) { 
     console.error(error); 
     return res.status(500).json({
     message: `an internal error occured`
    })
     
    }
 },

 exports.getUser = async(req, res, next)=> {
    const userId = req.params.id
    
    try {
        if (!mongoose.isValidObjectId(userId)) { 
            return res.status(404).json({
                message: `user Id is invalid`
        })
        }
    
       const user = await User.findById(userId)
       if (!user) {
        return res.status(404).json({
            message: `user id doesn't exist`
    })
       }
    
       return res.status(200).json(user)
        
    } catch (error) {
        console.error(error); 
        return res.status(500).json({
        message: `an internal error occured`
       })
        
        
    }
},
    
    exports.updateUser = async(req, res, next)=> {
        const UserId = req.params.id
        const {password} = req.body
        
        try {
            if (!mongoose.isValidObjectId(UserId)) { 
                return res.status(404).json({
                    message: `user Id is invalid`
            })
            }
        const hashedPassword = await argon2.hash(password)
        
           const user = await User.findByIdAndUpdate(UserId, {password: hashedPassword}, {new: true})
           if (!user) {
            return res.status(404).json({
                message: `user couldn't update, id is wrong`
        })
           }
        
           return res.status(200).json({message: `user updated succesfully`, user})
            
        } catch (error) {
            console.error(error); 
            return res.status(500).json({
            message: `an internal error occured`
           })
            
            
        }
        },
    
    exports.deleteUser = async(req, res, next)=> {
        const userId = req.params.id
            
        try {
             if (!mongoose.isValidObjectId(userId)) { 
                    return res.status(404).json({
                        message: `user Id is invalid`
                })
                }
            
               const user = await User.findByIdAndDelete(userId)
               if (!user) {
                return res.status(404).json({
                    message: `user id doesn't exist`
            })
               }
            
               return res.status(200).json({message: `user deleted successfully`})
                
            } catch (error) {
                console.error(error); 
                return res.status(500).json({
                message: `an internal error occured`
               })
                
                
            }
    }