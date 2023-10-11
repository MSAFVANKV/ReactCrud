const {Router} = require('express')
const {getTasks,saveTasks,updateTasks,deleteTasks} = require('../Controller/TaskController')
const {getUser,signUpUser, loginUser}=require('../Controller/userLogin')
const sessionChecker = require('../Middlware/sessionChecker')

const router = Router()

router
    .route('/login')
    .post(loginUser)

router
    .route('/signup')
    .post(signUpUser)

router
    .route('/get')
    .get(sessionChecker,getTasks)

router
    .route('/save')
    .post(sessionChecker,saveTasks)

router
    .route('/update/:id')
    .put(sessionChecker,updateTasks)

router
    .route('/delete/:id')
    .delete(sessionChecker,deleteTasks )

    router.get('/check-auth', (req, res) => {
        if (req.session.userId) {
            res.status(200).send({ isAuthenticated: true });
        } else {
            res.status(200).send({ isAuthenticated: false });
        }
    });
    

    router.get('/logout', (req, res) => {
        console.log("Trying to log out...");
        req.session.destroy((err) => {
          if (err) {
            console.log('Error destroying session:', err);
            return res.status(500).send({ msg: "Couldn't log out." });
          }
          console.log("Logged out successfully");
          res.status(200).send({ msg: "Logged out successfully" });
        });
      });
    
module.exports=router;