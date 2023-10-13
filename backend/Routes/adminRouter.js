const {Router} = require('express')
const {getAdminUser, adminLogin, createAdmin} = require('../Controller/Admin/adminController')
const adminSessionCheck = require('../Middlware/adminSession')


const router = Router()

router
    .route('/dashboard')
    .get(adminSessionCheck,getAdminUser)

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

module.exports=router;
