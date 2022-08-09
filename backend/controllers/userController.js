const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');



const registerUser = asyncHandler (async (req, res) => {
    const { name, email, password} = req.body;
    if (!(name && email && password))
        return res.sendStatus(400);    
    const userExists = await User.findOne({email});
    if (userExists)
    {
        return res.status(400);
    }

    // Hash Password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });
    if (!user)
    {
        return res.status(500) // server error
    }
    res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id) })
})


/*
Must ask about:
                 what happen after generating the token?
                 what is Bearer shema?
                 what is pipeline request-responce?
                 can you do some recoding with me ? structure of the project ask some question about some function?

*/

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    // if i add await i will have a problem
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password)))
    {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else
    {
        res.status(400);
        throw new Error ('Invalid credentials');
    }
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}
const getMe = asyncHandler( async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id);
    res.status(200).json({
        id:_id,
        name,
        email
    })
})

module.exports = {
    registerUser, loginUser, getMe
}