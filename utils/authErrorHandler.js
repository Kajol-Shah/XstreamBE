const handleAuthError = (err, res, isAPI = false) => {
    res.clearCookie('userSave');
    return isAPI 
        ? res.status(err.statusCode || 400).json({
            error: err.message || 'Authentication failed'
          })
        : res.redirect('/register');
};

module.exports = { handleAuthError };