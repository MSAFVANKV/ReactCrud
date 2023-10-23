const mangersSchema = require('../../Modals/AdminModal/mangers');
const bcrypt = require('bcryptjs')

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
