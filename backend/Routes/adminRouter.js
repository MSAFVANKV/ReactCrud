const {Router} = require('express')
const multer = require('multer')
const {getAdminUser, adminLogin, createAdmin, getAllUsers ,toggleBlockStatus, createAdminOrManager, loginManger} = require('../Controller/Admin/adminController')
const { createManager, uploadFile, getAllProducts, deleteFile } = require('../Controller/Admin/createMangers')
const {adminSessionCheck,managerSessionCheck} = require('../Middlware/adminSession')
const upload = require('../Utilities/imageUpload')

const router = Router()

    router
    .route('/all-users')
    .get(adminSessionCheck, getAllUsers);

    
        router
        .route('/managers')
        .post(managerSessionCheck,createManager)

        // router
        // .route('/LoginManager')
        // .post(loginManger)

    router
    .route('/toggle-block/:userId')
    .put(adminSessionCheck, toggleBlockStatus);


router
    .route('/login')
    .post(adminLogin)
router
    .route('/signup')
    .post(createAdminOrManager)
router
    .route('/managerslog')
    .post(loginManger)

    // manager products page routes
    router
    .route('/getProducts')
    .get(managerSessionCheck,getAllProducts);

    router
    .route('/product/delete/:_id')
    .delete(deleteFile);

router
   .route("/upload")
   .post(managerSessionCheck, upload.fields([
      { name: "file", maxCount: 1 },
    ]),uploadFile);


    // router.get('/check-admin-auth', (req, res) => {
    //     if (req.session.adminId) {
    //         res.status(200).send({ isAuthenticated: true });
    //     } if(req.session.managerId) {
    //         res.status(200).send({ isAuthenticated: true });
    //     } 
    //     else {
    //         res.status(200).send({ isAuthenticated: false });
    //     }
    // });
    router.get('/check-auth', (req, res) => {
        if (req.session.adminId) {
            return res.status(200).send({ isAuthenticated: 'admin' });
        } 
        else if(req.session.managerId) {
            return res.status(200).send({ isAuthenticated: 'manager' });
        } 
        else {
            return res.status(200).send({ isAuthenticated: false });
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
