
const adminUser = require('../../Modals/AdminModal/adminModal')
const bcrypt = require('bcryptjs')
const User = require("../../Modals/userModal");

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        console.log(users,"dashg");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send({ msg: "Error fetching users." });
    }
};


module.exports.getAdminUser = async (req, res) => {
    try {
        const adminUser = await adminUser.find();
        res.send(adminUser);
    } catch (error) {
        res.status(500).send({ msg: "Error fetching user." });
    }
};




module.exports.createAdmin = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body, "Admin req.body");
    if (!email || !password) {
        console.log("Email and password are required in admin.");

        return res.status(400).send({ msg: "Email and password are required." });
    }

    try {
        let admin = await adminUser.findOne({ email });
        if (admin) {
            console.log("Email conflict for:", email);
            return res.status(400).send({ msg: "Email already exists." });
        }

        const hashPsw = await bcrypt.hash(password, 12);

        admin = new adminUser({
            email,
            password: hashPsw
        });
        req.session.adminId = admin._id;
        const data = await admin.save();
        console.log("Created admin successfully");
        res.status(201).send({ email: data.email });

    } catch (err) {
        console.error("Error during admin signUp:", err);
        res.status(500).send({ msg: "Error saving user." });
    }
};

// module.exports.adminLogin = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const admin = await adminUser.findOne({ email });

//         if (!admin) {
//             res.status(401).json({ msg: "Invalid admin credentials" });
//             return;
//         }
       
//         const isValid = await bcrypt.compare(password, admin.password);

//         if (isValid) {
//             req.session.adminId = admin._id; 
//             req.session.isAuthenticated = true;
//             console.log("Logged in successfully");
//             res.status(200).send({ email: admin.email });
//         } else {
//             res.status(400).send({ msg: "Invalid email or password." });
//             console.log("Invalid email or password.");
//         }

//     } catch (err) {
//         res.status(500).json({ msg: "admin Server error" });
//     }
// };

module.exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await adminUser.findOne({ email });

        // Check if the admin with the given email exists
        if (!admin) {
            console.log('No admin account found with this email.');
            return res.status(401).send({ msg: "No admin account found with this email." });
        }
       
        // Check if the provided password matches the one in the database
        const isValid = await bcrypt.compare(password, admin.password);

        if (!isValid) {
            console.log('Incorrect password.');
            return res.status(400).send({ msg: "Incorrect password." });
        }

        // If everything's good, set session variables and return a success response
        req.session.adminId = admin._id; 
        req.session.isAuthenticated = true;
        console.log("Logged in successfully");
        res.status(200).send({ email: admin.email });

    } catch (err) {
        console.error("Error during admin login:", err);
        return res.status(500).json({ msg: "Internal server error." });
    }
};
