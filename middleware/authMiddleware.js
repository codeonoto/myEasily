// authMiddleware.js

// This middleware function checks if the user is authenticated
// and redirects them to the login page if they are not.
const authMiddleware = (req, res, next) => {
    // Check if the user is authenticated
    if (!req.session.userEmail) {
        // If not authenticated, redirect to the login page
        return res.redirect('/login');
    }
    // If authenticated, proceed to the next middleware or route handler
    next();
};

module.exports = authMiddleware;
