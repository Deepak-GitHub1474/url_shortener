const express = require("express");
require("dotenv").config();
const routes = require("./routes/url_routes");

const connectToDb = require("./config/db");
const PORT = process.env.PORT || 8000;

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/", routes);

// Listening server
app.listen(PORT, () => {
    connectToDb();
    console.log(`Server is running on http://localhost:${PORT}`);
});

