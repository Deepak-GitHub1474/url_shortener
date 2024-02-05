const express = require("express");

const route = express.Router();

// Test
route.get("/test", (req, res) => {
    res.status(200).json({message: "Tested Ok!"});
});

module.exports = route;