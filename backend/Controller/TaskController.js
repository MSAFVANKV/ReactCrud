const TaskModal = require('../Modals/TaskModal');
const userModal = require('../Modals/userModal');



// module.exports.getTasks = async (req, res) => {
//     const tasks = await TaskModal.find()
//     res.send(tasks)
  

// }
module.exports.getTasks = async (req, res) => {
    const userId = req.session.userId;
    const user = await userModal.findById(userId);
    if (!user) {
        return res.status(404).send({ msg: "User not found." });
    }
    res.send(user.tasks);
}


// module.exports.saveTasks = (req, res) => {
//     const { name, task } = req.body;

//     if (name === "" || task === "") {
//         res.status(400).send({ msg: "Both name and task fields are required." });
//         return;
//     }

//     TaskModal.create({ name, task })
//         .then((data) => {
//             console.log("Saved successfully");
//             res.status(201).send(data);
//         })
//         .catch((err) => {
//             console.log(err);
//             res.send({ error: err, msg: "Error in saveTasks create func" });
//         });
// }

module.exports.saveTasks = async (req, res) => {
    const userId = req.session.userId;
    const { name, task } = req.body;

    try {
        let user = await userModal.findById(userId);
        if (!user) {
            return res.status(404).send({ msg: "User not found." });
        }

        user.tasks.push({ name, task });
        await user.save();

        return res.status(201).send({ tasks: user.tasks });
    } catch (err) {
        console.error("Error during adding a task:", err);
        res.status(500).send({ msg: "Error adding task." });
    }
};


// module.exports.updateTasks = (req, res) => {
//     const { id } = req.params;
//     const { name, task } = req.body;

//     TaskModal.findByIdAndUpdate(id, { name, task })
//         .then(() => res.send('Updated successfully'))
//         .catch((err) => {
//             console.log(err);
//             res.send({ error: err, msg: "Error in updateTasks func" });
//         });
// }
module.exports.updateTasks = async (req, res) => {
    const userId = req.session.userId;
    const { id } = req.params;
    const { name, task } = req.body;

    let user = await userModal.findById(userId);
    if (!user) {
        return res.status(404).send({ msg: "User not found." });
    }
    
    const taskIndex = user.tasks.findIndex(t => t._id.toString() === id);
    if (taskIndex === -1) {
        return res.status(404).send({ msg: "Task not found." });
    }

    user.tasks[taskIndex].name = name;
    user.tasks[taskIndex].task = task;
    await user.save();

    res.send('Updated successfully');
}


// module.exports.deleteTasks =  (req, res) => {
//     const {id} = req.params


//     TaskModal.findByIdAndDelete(id)
//     .then(()=> res.send('Deleted successfully'))
//     .catch((err)=>{
//         console.log(err);
//         res.send({error:err, msg:"Error in Deletetask"})
//     })
  

// }
module.exports.deleteTasks = async (req, res) => {
    const userId = req.session.userId;
    const { id } = req.params;

    let user = await userModal.findById(userId);
    if (!user) {
        return res.status(404).send({ msg: "User not found." });
    }
    
    user.tasks = user.tasks.filter(t => t._id.toString() !== id);
    await user.save();

    res.send('Deleted successfully');
}
