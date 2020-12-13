const jwt = require('jsonwebtoken')


async function authenticate(req, res, next) {
    let headers = req.headers['authorization']
    
    if (headers) {
        const token = headers.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_CODE)
        
        if (decoded) {
            const user_id = decoded.id

            let user = await db.any('SELECT id from users WHERE id= $1', [user_id])
            
            if (user) {
                res.locals.id = user[0].id
                next()
            } else {
                res.json({success: "no user found"})
            }
        }
         
    }
}

module.exports = authenticate