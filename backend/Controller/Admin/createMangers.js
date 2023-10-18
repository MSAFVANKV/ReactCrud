const mangersSchema = require('../../Modals/AdminModal/mangers');
const bcrypt = require('bcryptjs')

module.exports.createManager = async (req, res) => {
    const { manegername, password } = req.body;
    if (!manegername || !password) {
        console.log("manegername and password are required for create Manger.");

        return res.status(400).send({ msg: "manegername and password are required." });
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
