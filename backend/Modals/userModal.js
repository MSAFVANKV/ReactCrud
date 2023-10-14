const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required:true,
    },
    tasks: [{
        task: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }],
    isBlocked: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model("userCollection",userSchema) 