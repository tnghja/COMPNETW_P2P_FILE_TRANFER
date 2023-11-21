const express = require('express')
const {registerUser, loginUser, findUser, getUsers} = require('../Controllers/userController')

const router = express.Router()

router.route('/register')
.get((req,res)=>{
    res.render('register')
})
.post(registerUser)

router.route('/login')
.get((req,res)=>{
    res.render('login')
})
.post( loginUser)

router.get('/find/:userId', findUser)
router.get('/', getUsers)

module.exports = router;