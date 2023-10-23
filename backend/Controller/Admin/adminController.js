
const adminUser = require('../../Modals/AdminModal/adminModal')
const managerUser = require('../../Modals/AdminModal/mangers')
const bcrypt = require('bcryptjs')
const User = require("../../Modals/userModal");

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        // console.log(users,"dashg");
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




// module.exports.createAdmin = async (req, res) => {
//     const { email, password, userType } = req.body;
//     console.log(req.body, "Admin req.body");
//     if (!email || !password || !userType) {
//         console.log("Email and password are required in admin.");

//         return res.status(400).send({ msg: "Email and password and userType are required." });
//     }

//     try {
//         let admin = await adminUser.findOne({ email });
//         if (admin) {
//             console.log("Email conflict for:", email);
//             return res.status(400).send({ msg: "Email already exists." });
//         }

//         const hashPsw = await bcrypt.hash(password, 12);

//         admin = new adminUser({
//             email,
//             password: hashPsw,
//             userType
//         });
//         req.session.adminId = admin._id;
//         const data = await admin.save();
//         console.log("Created admin successfully");
//         res.status(201).send({ email: data.email });

//     } catch (err) {
//         console.error("Error during admin signUp:", err);
//         res.status(500).send({ msg: "Error saving user." });
//     }
// };

module.exports.createAdminOrManager = async (req, res) => {
    const { email, password, userType } = req.body;

    if (!email || !password || !userType) {
        return res.status(400).send({ msg: "Email, password, and userType are required." });
    }

    try {
        let user;

        // Check if user already exists based on type
        if (userType === "admin") {
            user = await adminUser.findOne({ email });
        } else if (userType === "manager") {
            user = await managerUser.findOne({ email });
        } else {
            return res.status(400).send({ msg: "Invalid user type." });
        }

        if (user) {
            return res.status(400).send({ msg: "Email already exists." });
        }

        const hashPsw = await bcrypt.hash(password, 12);

        if (userType === "admin") {
            user = new adminUser({
                email,
                password: hashPsw,
                userType
            });
        } else if (userType === "manager") {
            user = new managerUser({
                email,
                password: hashPsw,
                userType
            });
        }

        const data = await user.save();
        res.status(201).send({ email: data.email });

    } catch (err) {
        res.status(500).send({ msg: "Error saving user." });
    }
};


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
        console.log("Logged in successfully",req.session.adminId);
        res.status(200).send({ email: admin.email });

    } catch (err) {
        console.error("Error during admin login:", err);
        return res.status(500).json({ msg: "Internal server error." });
    }
};

module.exports.loginManger = async (req, res) => {
    const {email , password} = req.body
    console.log("manager")
    try {
        const manager = await managerUser.findOne({ email })

        if(!manager){
            console.log('Invalid manager name.');
            return res.status(400).json({ message: "Invalid manager email." });
        }
        const isMatch = await bcrypt.compare(password, manager.password)
        if(!isMatch){
            console.log('Invalid password.');
            return res.status(400).json({ message: "Invalid manager password." });

        }
        req.session.managerId = manager._id;
        req.session.isAuthenticated = true;
        console.log("manager logged in",req.session.managerId);

        res.status(200).send({ email: manager.email });
        // res.status(200).json({ 
        //     message: "Logged in successfully.",
        //     managerDetails: manager  // Return manager details or token for frontend to identify
        // });

    } catch (error) {
        console.error('Error manager logging in:', error);
        res.status(500).json({ message: "Error manager logging in.", error: error.message });
    }
    
}


module.exports.toggleBlockStatus = async (req, res) => {
    try {
        // Fetch the current user
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).send({ msg: "User not found" });

        // Toggle the isBlocked status
        user.isBlocked = !user.isBlocked;
        await user.save();
        console.log('User blocked successfully');
        res.status(200).send({ msg: user.isBlocked ? "User blocked successfully" : "User unblocked successfully", user });
    } catch (error) {
        res.status(500).send({ msg: "Internal server error", error });
    }
};
