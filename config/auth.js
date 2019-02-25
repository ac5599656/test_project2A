module.exports = {
    ensureAuthenticated: function (req, res, next) {
        console.log("Running");
        // console.log("AUTHENTICATED USER:", req.user);
        // console.log("SD:LKFJ:LSDKJF:", req.user);
        if (req.isAuthenticated()) {
            return next();
        }
        console.log("User Not Authenticated")
        res.redirect("/auth/login");
    }
};