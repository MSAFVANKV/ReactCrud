const mongoose= require('mongoose')


const adminSchema = new mongoose.Schema({
    username: {
        type: String,
      },
      email: {
        type: String,
        unique: true,
      },
      password: {
        type: String,
      },
      userType: {
        type: String,
        default: "admin"
    }
    
})

module.exports = mongoose.model('adminuser',adminSchema)