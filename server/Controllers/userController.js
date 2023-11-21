const userModel = require('../Models/userModel')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const createToken = (_id) =>{
    const jwtkey = process.env.JWT_SECRET_KEY;

    return jwt.sign({_id}, jwtkey)
}
const registerUser = async (req,res) => {
    try
    {
        console.log(req.body)
        const {name, password, repeated_password} =req.body

    let user = await userModel.findOne({name})

    if(user) return res.status(400).json("Username already exist")

    if(!name || !password) return res.status(400).json("Missing info")

    if(password != repeated_password) return res.status(400).json("Password  k giong nhau")
   
    user = new userModel({name, password})
    
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    await user.save()

    const token = createToken(user._id)

    res.status(200).json({_id : user._id, name , token})
    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

const loginUser = async(req,res) =>{
    const {name,password} = req.body
    try{
        let user = await userModel.findOne({name})

        if(!user) return res.status(400).json("Already used username") 

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) return res.status(400).json("Wrong password")

        const token = createToken(user._id)

        res.status(200).json({_id : user._id, name : user.name , token})
    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

const findUser = async (req,res) =>{
    const userId = req.params.userId
    try{
        const user = await userModel.findById(userId)

        res.status(200).json(user)
    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

const getUsers = async (req,res) =>{
    const userId = req.params.userId
    try{
        const user = await userModel.find()
        res.status(200).json(user)
    }
    catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}
module.exports = {registerUser, loginUser, findUser, getUsers}