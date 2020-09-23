module.exports = {
    ensureAuth : (req, res, next) => {
      if (req.isAuthenticated()) {
        return next()
      }
      res.redirect('/') // if not auth
    },
  
    forwardAuth : (req, res, next) => {
      if (!req.isAuthenticated()) {
        return next()
      }
      res.redirect('/profile');  // if auth    
    }
  }