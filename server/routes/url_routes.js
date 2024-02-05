const express = require("express");
const {handleShortUrl, redirectOriginalURL, analyticClicks} = require("../controllers/url_controller");

const route = express.Router();

// Test
route.get("/test", (req, res) => {
    res.status(200).json({message: "Tested Ok!"});
});

// Create short id
route.post("/originalUrl", handleShortUrl);

// Redirect to original url
route.get("/:shortUrl", redirectOriginalURL);

// Analytics for number of times each url clicked
route.get("/analytics/:shortUrl", analyticClicks);

module.exports = route;