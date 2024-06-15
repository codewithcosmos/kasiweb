// middleware/auth.js
function addUserToLocals(req, res, next) {
    res.locals.user = req.session.user;
    next();
  }
  
  module.exports = addUserToLocals;
  