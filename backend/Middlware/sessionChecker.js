const sessionCheck = (req, res, next) => {
    if (req.session.userId) {  // Use the same casing
        next();
    } else {
        res.redirect('/login');
    }
}


module.exports = sessionCheck;