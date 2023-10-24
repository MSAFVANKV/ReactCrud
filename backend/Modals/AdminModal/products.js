const mongoose= require('mongoose')


const productSchema = new mongoose.Schema({
    file: {
        type: String,
      },
      productname: {
        type: String,
        unique: true,
      },
    
})

module.exports = mongoose.model('products',productSchema)