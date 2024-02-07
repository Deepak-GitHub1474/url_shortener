const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({

    originalURL: {
        type: String,
        required: true,
    },

    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },

    clickRecords: [{ 
        timestamp: { type: Number } 
    }],

    userEmail: {
        type: String,
    }

}, { timestamps: true });

const ShortURL = mongoose.model('shorturls', urlSchema);

module.exports = ShortURL;
