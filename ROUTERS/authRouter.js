const express = require('express')
const router = express.Router()
const Users = require('../MODELS/userSchema')
const bcrypt = require('bcrypt')

router.route('/signup')
    .post(async(req,res)=>{
        const {username,password} = req.body
        try {
            if(!username || !password){
                throw new Error("Username and password are required")
            }
            const hashedPassword = await bcrypt.hash(password,10)
            const newuser = await Users.create({username:username,password:hashedPassword})
            res.json({"message":"ok"})
        } catch (error) {
            res.status(400).send()
            console.log(error.message)
        }
    })
router.route('/signin')
    .post(async (req, res) => {
        const user = req.body.username
        const pwd = req.body.password
        if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
        // evaluate password 
        const foundUser = await Users.findOne().where({username:user})
        if (!foundUser) return res.status(400).json({ 'message': 'Invalid username or password' });
        const match = await bcrypt.compare(pwd, foundUser.password);
        if (match) {
            // create JWTs
            res.json({ "message":"ok"});
        } else {
            res.sendStatus(401);
        }
    })

module.exports = router