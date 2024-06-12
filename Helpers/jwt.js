const jwt = require(`jsonwebtoken`)

const checkAuth= (req, res, next) => {
    try {

        const token = req.headers.authorization.split(' ')[1];
        if (!token) { return res.status(403).json({message: `you don't have authorization token`})   
        }

        const decoded =  jwt.verify(token, process.env.JWT_KEY)


        if (!decoded.isAdmin) { return res.status(403).json({message: `you don't have authorized access`})   
        }
        
     next()

    } catch (error) {
     return res.status(401).json({message: `authentication failed`})   
    }
   
}

module.exports  = checkAuth