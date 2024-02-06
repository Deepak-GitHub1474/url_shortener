const express = require("express");
const {
        handleShortUrl, 
        redirectOriginalURL, 
        analyticClicks, 
        userRegister, 
        userLogin, 
        userActionController, 
        UserLogout,
        getAllShortUrl
    } = require("../controllers/url_controller");

const { registerValidation, loginValidation, verifyUser } = require("../middlewares/user-validation");
const route = express.Router();

// Test
route.get("/test", (req, res) => {
    res.status(200).json({message: "Tested Ok!"});
});

// Home
route.get("/", verifyUser, userActionController);

// Get all shortUrl
route.get("/shorturls", getAllShortUrl);

// User Register
route.post("/register", registerValidation, userRegister);

// User Login
route.post("/login", loginValidation, userLogin);

// User Logout
route.get("/logout", UserLogout);

// Create short id
route.post("/originalUrl", handleShortUrl);

// Redirect to original url
route.get("/:shortUrl", redirectOriginalURL);

// Analytics for number of times each url clicked
route.get("/analytics/:shortUrl", analyticClicks);

module.exports = route;