const TaskModal = require('../Modals/TaskModal');


module.exports.getTasks = async (req, res) => {
    const tasks = await TaskModal.find()
    res.send(tasks)
  

}

module.exports.saveTasks =  (req, res) => {
    
    const {task} = req.body

    TaskModal.create({task})
    .then((data)=>{
        console.log("saved successfully");
        res.status(201).send(data)
    })
    .catch((err)=>{
        console.log(err);
        res.send({error:err, msg:"Error in getTasks create func"})
    })
  

}

module.exports.updateTasks =  (req, res) => {
    const {id} = req.params
    
    const {task} = req.body

    TaskModal.findByIdAndUpdate(id,{task})
    .then(()=> res.send('Updated successfully'))
    .catch((err)=>{
        console.log(err);
        res.send({error:err, msg:"Error in updateTasks func"})
    })
  

}

module.exports.deleteTasks =  (req, res) => {
    const {id} = req.params


    TaskModal.findByIdAndDelete(id)
    .then(()=> res.send('Deleted successfully'))
    .catch((err)=>{
        console.log(err);
        res.send({error:err, msg:"Error in Deletetask"})
    })
  

}