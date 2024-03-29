const shortid = require("shortid");
const ShortURL = require("../models/url_model");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create short id
exports.handleShortUrl = async (req, res) => {
    const {url, email} = req.body;
    // console.log("userlLongUrl===>", url);

    if (!url) {
        return res.status(400).json({ msg: "url is required!" });
    }

    const shortUrl = shortid();
    // console.log("shortUrl====>", shortUrl);

    await ShortURL.create({
        shortUrl: shortUrl,
        originalURL: url,
        clickRecords: [],
        userEmail: email
    });

    return res.status(200).json({ msg: `ShortUrl created`, shortUrl: shortUrl });

};

// Get short id and redirect to original url
exports.redirectOriginalURL = async (req, res) => {
    const shortUrl = req.params.shortUrl;
    // console.log("ShortUrl===>", shortUrl);
    const findShortUrl = await ShortURL.findOneAndUpdate({ shortUrl },
        {
            $push: {
                clickRecords: {
                    timestamp: Date.now(),
                },
            },
        }
    );

    // res.redirect(findShortUrl.originalURL); // API Testing
    res.status(200).json({originalURL: findShortUrl.originalURL});
}

// Get short id to analytics
exports.analyticClicks = async (req, res) => {
    const shortUrl = req.params.shortUrl;
    const findShortUrl = await ShortURL.findOne({shortUrl});
    res.status(200).json(
        {totalClicks: findShortUrl.clickRecords.length}
    );
    console.log("TotalClicks===> ",findShortUrl.clickRecords.length);
}

// Get all shorturls
exports.getAllShortUrl = async (req, res) => {
    ShortURL.find()
        .then(shorturl => res.json(shorturl))
        .catch(err => res.json(err))
};

// User dashboard access control
exports.userActionController = (req, res) => {
    return res.status(200).json({ email: req.email, name: req.name, });
}

// User Register
exports.userRegister = (req, res) => {
    const {name, email, password } = req.body;

    // Check if the email already exists in the database
    User.findOne({ email: email })
        .then(existingUser => {
            if (existingUser) {
                // If email already exists, send a response indicating it
                res.status(400).json({ msg: "Email already exists" })
            } else {
                // If email is unique, hash the password and create the new user
                bcrypt.hash(password, 10)
                    .then(hash => {
                        User.create({name, email, password: hash })
                            .then(user => {
                                // If user is created successfully, send the success response
                                res.status(200).json({ msg: "Successfully registered", user: user });
                            })
                            .catch(err => res.json(err))
                    })
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
};


// User login controller
exports.userLogin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ email: user.email, name: user.name },
                        process.env.JWT_SECRET, { expiresIn: "1d" })
                        res.cookie("token", token, {
                            httpOnly: true,
                            sameSite: process.env.CORS_SAME_SITE,
                            secure: true,
                            path: '/'
                        });
                        res.status(200).json({ msg: "Success", user: user })

                    } else {
                        res.status(401).json({ msg: "Wrong Password" })
                    }
                })
            } else {
                res.status(404).json({ msg: "No Account associated with this email" })
            }
        })
}

// User Logout
exports.UserLogout = (req, res) => {

    res.cookie("token", "", {
        expires: new Date(0),
        httpOnly: true,
        sameSite: process.env.CORS_SAME_SITE,
        secure: true,
        path: '/'
    });
    return res.status(200).json({ msg: "Success" });
};

// Delete Short Url
exports.deleteShortUrl = (req, res) => {
    ShortURL.findByIdAndDelete({ _id: req.params.id })
        .then(result => res.status(200).json({msg: "URL deleted!"}))
        .catch(err => res.status(500).json(err))
}

// Update Short Url
exports.updateShortUrl = (req, res) => {
    ShortURL.findByIdAndUpdate(
        { _id: req.params.id },
        {
            shortUrl: req.body.shortUrl,
        }
    ).then(result => res.status(200).json({msg: "URL updated!"}))
     .catch(err => res.status(500).json(err))
}