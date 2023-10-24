const mangersSchema = require('../../Modals/AdminModal/mangers');
const bcrypt = require('bcryptjs')
const sharp=require("sharp")
const productsCollection = require('../../Modals/AdminModal/products')

// module.exports.loginManger = async (req, res) => {
//     const {email , password} = req.body
//     console.log("manager")
//     try {
//         const manager = await mangersSchema.findOne({ email })

//         if(!manager){
//             console.log('Invalid manager name.');
//             return res.status(400).json({ message: "Invalid manager name." });
//         }
//         const isMatch = await bcrypt.compare(password, manager.password)
//         if(!isMatch){
//             console.log('Invalid password.');
//             return res.status(400).json({ message: "Invalid password." });

//         }
//         req.session.managerId = manager._id;
//         req.session.isAuthenticated = true;
//         res.status(200).json({ 
//             message: "Logged in successfully.",
//             managerDetails: manager  // Return manager details or token for frontend to identify
//         });

//     } catch (error) {
//         console.error('Error logging in:', error);
//         res.status(500).json({ message: "Error logging in.", error: error.message });
//     }
    
// }

module.exports.createManager = async (req, res) => {
    const { email, password,userType } = req.body;
    if (!email || !password) {
        console.log("email and password are required for create Manger.");

        return res.status(400).send({ msg: "managername and password are required." });
    }
    try {
        let manger = await mangersSchema.findOne({email})
        if (manger) {
            console.log("email conflict for:", email);
            return res.status(400).send({ msg: "email already exists." });
        }

        const hashPsw = await bcrypt.hash(password, 12);

         manger = new mangersSchema({
            email,
            password:hashPsw
         }) 
         const data = await manger.save();
        console.log("Created manger successfully");
        res.status(201).send({ email: data.email });
       
    } catch (error) {
        console.error("Error during manger signUp:", err);
        res.status(500).send({ msg: "Error saving manger." });
    }
}


// Fetch all products
module.exports.getAllProducts = async (req, res) => {
    try {
        const products = await productsCollection.find({});
        res.status(200).send(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error fetching products");
    }
}

// uload images
module.exports.uploadFile = async (req, res) => {
    try {
        let productInput = req.body.file;
        let productImges = `${productInput}_file_${Date.now()}.png`;
        await sharp(req.files.file[0].buffer)
        .toFormat("png")
        .png({ quality: 80 })
        .toFile(`Public/images/${productImges}`);

        const productCheck = await productsCollection.findOne({ file: productImges });
        if (productCheck) {
            const product = await productsCollection.find({});
            res.status(201).send({ details: product });
          
        }else {
            const newProduct = new productsCollection({
                file:productImges,
                productname:req.body.productname
            });
            const products = await productsCollection.find({});
            await newProduct.save();
            // res.status(200).send({ newProduct });
            res.status(200).send({ details: products, newProduct });

        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error adding products");
    }
}

module.exports.deleteFile = async (req, res) => {
    const { _id } = req.params;

    if(!_id) {
        return res.status(400).send({ msg: "Product ID not provided." });
    }
    
    try {
        const product = await productsCollection.findByIdAndDelete(_id);

        if (!product) {
            console.log('Product not found.');
            return res.status(404).send({ msg: "Product not found." });
        }
        console.log('Deleted successfully');
        res.send({ msg: 'Deleted successfully', product });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send({ error: error.message, msg: "Internal Server Error deleting product" });
    }
}

