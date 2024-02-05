const express = require("express");
const {handleShortUrl, redirectOriginalURL} = require("../controllers/url_controller")

const route = express.Router();

// Test
route.get("/test", (req, res) => {
    res.status(200).json({message: "Tested Ok!"});
});

// Create short id
route.post("/originalUrl", handleShortUrl);

// Redirect to original url
route.get("/:shortUrl", redirectOriginalURL);

module.exports = route;