const userModal = require("../Modals/userModal");
const bcrypt = require('bcryptjs');

module.exports.getUser = async (req, res) => {
    try {
        const user = await userModal.find();
        res.send(user);
    } catch (error) {
        res.status(500).send({ msg: "Error fetching user." });
    }
};

module.exports.signUpUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body,"signUpUser req.body");
    if (!email || !password) {
        console.log("Email and password are required.");

        return res.status(400).send({ msg: "Email and password are required." });
    }
    
    try {
        let user = await userModal.findOne({ email });
        if (user) {
            console.log("Email conflict for:", email);
            return res.status(400).send({ msg: "Email already exists." });
        }
        
        const hashPsw = await bcrypt.hash(password, 12);

        user = new userModal({
            email,
            password: hashPsw
        });
        req.session.userId= user._id 
        const data = await user.save();
        console.log("Created user successfully");
        res.status(201).send({ email: data.email });
        
    } catch (err) {
        console.error("Error during signUp:", err);
        res.status(500).send({ msg: "Error saving user." });
    }
};

module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log('loginUser not found.',req.body);

    try {
        const user = await userModal.findOne({ email });

        if (!user) {
            console.log('Username not found.');
            return res.status(400).send({ msg: "Username not found." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            req.session.userId = user._id;  
            req.session.isAuthenticated = true;
            console.log("Logged in successfully");
            res.status(200).send({ email: user.email });
        } else {
            req.session.userId= user._id 
            res.status(400).send({ msg: "Invalid email or password." });
        }
        
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: "Error logging in." });
    }
};
