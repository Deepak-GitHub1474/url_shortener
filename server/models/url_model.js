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

}, { timestamps: true });

const ShortURL = mongoose.model('ShortURL', urlSchema);

module.exports = ShortURL;
