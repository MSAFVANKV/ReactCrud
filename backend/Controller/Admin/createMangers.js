const mangersSchema = require('../../Modals/AdminModal/mangers');
const bcrypt = require('bcryptjs')

module.exports.loginManger = async (req, res) => {
    const {manegername , password} = req.body
    try {
        const manager = await mangersSchema.findOne({ manegername })

        if(!manager){
            console.log('Invalid manager name.');
            return res.status(400).json({ message: "Invalid manager name." });
        }
        const isMatch = await bcrypt.compare(password, manager.password)
        if(!isMatch){
            console.log('Invalid password.');
            return res.status(400).json({ message: "Invalid password." });

        }
        req.session.managerId = manager._id;
        // res.status(200).json({ message: "Logged in successfully." });
        res.status(200).json({ 
            message: "Logged in successfully.",
            managerDetails: manager  // Return manager details or token for frontend to identify
        });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: "Error logging in.", error: error.message });
    }
    
}

module.exports.createManager = async (req, res) => {
    const { manegername, password } = req.body;
    if (!manegername || !password) {
        console.log("manegername and password are required for create Manger.");

        return res.status(400).send({ msg: "managername and password are required." });
    }
    try {
        let manger = await mangersSchema.findOne({manegername})
        if (manger) {
            console.log("manegername conflict for:", manegername);
            return res.status(400).send({ msg: "manegername already exists." });
        }

        const hashPsw = await bcrypt.hash(password, 12);

         manger = new mangersSchema({
            manegername,
            password:hashPsw
         }) 
         const data = await manger.save();
        console.log("Created manger successfully");
        res.status(201).send({ manegername: data.manegername });
       
    } catch (error) {
        console.error("Error during manger signUp:", err);
        res.status(500).send({ msg: "Error saving manger." });
    }
}
