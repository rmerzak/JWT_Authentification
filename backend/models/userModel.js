const mongoose = require('mongoose')

const userShema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add a email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add a Password"]
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userShema);
