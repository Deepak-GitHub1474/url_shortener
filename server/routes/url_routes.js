const express = require("express");
const {handleShortUrl, redirectOriginalURL, analyticClicks, userRegister, userLogin} = require("../controllers/url_controller");
const { registerValidation, loginValidation } = require("../middlewares/user-validation");
const route = express.Router();

// Test
route.get("/test", (req, res) => {
    res.status(200).json({message: "Tested Ok!"});
});

// User Register
route.post("/register", registerValidation, userRegister);

// User Login
route.post("/login", loginValidation, userLogin);

// Create short id
route.post("/originalUrl", handleShortUrl);

// Redirect to original url
route.get("/:shortUrl", redirectOriginalURL);

// Analytics for number of times each url clicked
route.get("/analytics/:shortUrl", analyticClicks);

module.exports = route;