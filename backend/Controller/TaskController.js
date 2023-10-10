const TaskModal = require('../Modals/TaskModal');


module.exports.getTasks = async (req, res) => {
    const tasks = await TaskModal.find()
    res.send(tasks)
  

}

module.exports.saveTasks = (req, res) => {
    const { name, task } = req.body;

    if (name === "" || task === "") {
        res.status(400).send({ msg: "Both name and task fields are required." });
        return;
    }

    TaskModal.create({ name, task })
        .then((data) => {
            console.log("Saved successfully");
            res.status(201).send(data);
        })
        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "Error in saveTasks create func" });
        });
}


module.exports.updateTasks = (req, res) => {
    const { id } = req.params;
    const { name, task } = req.body;

    TaskModal.findByIdAndUpdate(id, { name, task })
        .then(() => res.send('Updated successfully'))
        .catch((err) => {
            console.log(err);
            res.send({ error: err, msg: "Error in updateTasks func" });
        });
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