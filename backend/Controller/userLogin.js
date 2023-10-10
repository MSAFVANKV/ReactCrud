const userModal = require("../Modals/userModal");

module.exports.getUser = async (req, res) => {
    const user = await userModal.find()
    res.send(user)
  

}