const shortid = require("shortid");
const ShortURL = require("../models/url_model");

// Create short id
exports.handleShortUrl = async (req, res) => {
    const userlLongUrl = req.body;
    console.log("userlLongUrl===>", userlLongUrl);

    if (!userlLongUrl.url) {
        return res.status(400).json({ message: "url is required!" });
    }

    const shortUrl = shortid();
    console.log("shortUrl====>", shortUrl);

    await ShortURL.create({
        shortUrl: shortUrl,
        originalURL: userlLongUrl.url,
        clickRecords: [],
    });

    return res.status(200).json({ shortUrl: `ShortUrl created ${shortUrl}` });
};

// Get short id and redirect to original url
exports.redirectOriginalURL = async (req, res) => {
    const shortUrl = req.params.shortUrl;
    const findShortUrl = await ShortURL.findOneAndUpdate({ shortUrl },
        {
            $push: {
                clickRecords: {
                    timestamp: Date.now(),
                },
            },
        }
    );
    res.redirect(findShortUrl.originalURL);
}