const adminSessionCheck = (req, res, next) => {
    if (req.session.adminId) {  // Use the same casing
        next();
    } else {
        res.redirect('/login');
    }
}
const managerSessionCheck = (req, res, next) => {
    if (req.session.managerId) {  // Use the same casing
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = {adminSessionCheck,managerSessionCheck};