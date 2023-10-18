const {Router} = require('express')
const {getAdminUser, adminLogin, createAdmin, getAllUsers ,toggleBlockStatus,} = require('../Controller/Admin/adminController')
const { createManager } = require('../Controller/Admin/createMangers')
const adminSessionCheck = require('../Middlware/adminSession')


const router = Router()

router
    .route('/dashboard')
    .get(adminSessionCheck,getAdminUser)

    router
    .route('/all-users')
    .get(adminSessionCheck, getAllUsers);

    
        router
        .route('/managers')
        .post(createManager)

    router
    .route('/toggle-block/:userId')
    .put(adminSessionCheck, toggleBlockStatus);


    router
    .route('/login')
    .post(adminLogin)
router
    .route('/signup')
    .post(createAdmin)
    
    router.get('/check-admin-auth', (req, res) => {
        if (req.session.adminId) {
            res.status(200).send({ isAuthenticated: true });
        } else {
            res.status(200).send({ isAuthenticated: false });
        }
    });

    router.get('/admin/logout', (req, res) => {
        if(!req.session) {
            console.log("No active admin session.");
            return res.status(400).send({ msg: "No active admin session." });
        }
    
        req.session.destroy((err) => {
            if (err) {
                console.log("Couldn't log out.");
                return res.status(500).send({ msg: "Couldn't log out." });
            }
            console.log("Admin logged out successfully.");
            res.status(200).send({ msg: "Admin logged out successfully" });
        });
    });
    
    

module.exports=router;
