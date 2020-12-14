const jwt = require("jsonwebtoken")
var bcrypt = require('bcryptjs')

class IndexController {

    registerUser = async (req, res) => {

        let username = req.body.data.username
        let password = req.body.data.password
        let zone = req.body.data.zone

             // check to ensure username does not already exist
            const user = await db.any('SELECT username from users WHERE username = $1', [username])

            if (user.length > 0) {
                //user already exists            
                res.json({ message: "This user name has already been taken" })
            } else {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, function (err, hash) {
                        db.none('INSERT INTO users (username, password, zone) VALUES ($1, $2, $3)', [username, hash, zone]
                        ).then(() => {
                            res.json({ success: true })
                        }).catch(() => {
                            res.json({ message: "There was an error processing your request, please try again" })
                        })
                    })
                })
            }

    }

    loginUser = async (req, res) => {

        let username = req.body.data.username
        let password = req.body.data.password

       
        //check to see if user is in db
        const user = await db.any('SELECT id, username, password, zone, garden_name, garden_id from users WHERE username = $1', [username])

    
            if (user.length == 0) {
                //no user found
                res.json({ message: "Your user name is not valid" })
            } else {
                user.map(user => {
                    bcrypt.compare(password, user.password, function (err, result) {
                        if (result) {
                            const token = jwt.sign({ id: user.id }, process.env.JWT_CODE)
                            res.json({ token: token, zone: user.zone, garden_name: user.garden_name, garden_id: user.garden_id })
                        } else {
                            //username is correct & password is wrong
                            res.json({ message: "Your password is not valid" })
                        }
                    })
                })
            }

    }


    loginGuest = async (req, res) => {

        let username = "MontyDon"
        let password = "Nigel86"

       
        //check to see if user is in db
        const user = await db.any('SELECT id, username, password, zone, garden_name, garden_id from users WHERE username = $1', [username])
    
            if (user.length == 0) {
                //no user found
                res.json({ message: "Your user name is not valid" })
            } else {
                user.map(user => {
                    bcrypt.compare(password, user.password, function (err, result) {
                        if (result) {
                            const token = jwt.sign({ id: user.id }, process.env.JWT_CODE)
                            res.json({ token: token, zone: user.zone, garden_name: user.garden_name, garden_id: user.garden_id })
                        } else {
                            //username is correct & password is wrong
                            res.json({ message: "Your password is not valid" })
                        }
                    })
                })
            }

    }




}




module.exports = IndexController