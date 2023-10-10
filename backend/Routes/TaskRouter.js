const {Router} = require('express')
const {getTasks,saveTasks,updateTasks,deleteTasks} = require('../Controller/TaskController')

const router = Router()

router
    .route('/get')
    .get(getTasks)

router
    .route('/save')
    .post(saveTasks)

router
    .route('/update/:id')
    .put(updateTasks)

router
    .route('/deleteTasks/:id')
    .delete(deleteTasks )

module.exports=router;