
const UrlModel = require("../models/url");
var { nanoid } = require("nanoid");
const logData = require("../utils");

async function handleGenerateShortUrl(req, res) {

    if (!req.body.url) {
        return res.status(400).json({
            message: 'Url is required.'
        })
    }

    try {

        const data = {
            shortId: nanoid(8),
            redirectUrl: req.body.url,
            visitorHistory: []
        }

        const urlData = await UrlModel.create(data);

        if (!urlData) {
            return res.status(500).json({
                error: "short url is not created, something went wrong."
            })
        }

        return res.status(201).json({
            data: urlData
        });

    }
    catch (err) {
        const data = `Error - handleGenerateShortUrl | Message - ${err.message} | Time - ${Date.now()}`;
        logData("errors.txt", data);
    }
}


async function handleGetAnalytics(req, res) {
    if (!req.params.shortid) {
        return res.status(400).json({
            error: "Short id is required!"
        })
    }

    try {
        const shortId = req.params.shortid;

        const urlData = await UrlModel.findOne({ shortId, shortId });

        if (!urlData) {
            return res.status(404).json({
                error: "Data is not found"
            })
        }

        return res.status(200).json({
            totalCount: urlData.visitorHistory.length,
            data: urlData
        })

    }
    catch (err) {
        const data = `Error - handleRedirectUrl | Message - ${err.message} | Time - ${Date.now()}`;
        logData("errors.txt", data);
    }
}


async function handleRedirectUrl(req, res) {

    if (! req.params.shortid) {
        return res.status(400).json({
            error: "Short id is required!"
        })
    }

    try {
        const shortId = req.params.shortid;
        const updatedData = await UrlModel.findOneAndUpdate({ shortId }, {
            $push: {
                visitorHistory: {
                    timestamp: Date.now()
                }
            }
        });

        if (!updatedData) {
            return res.status(500).json({
                error: "Visior count not updated."
            })
        }

        res.redirect(updatedData.redirectUrl);
    }
    catch (err) {
        const data = `Error - handleRedirectUrl | Message - ${err.message} | Time - ${Date.now()}`;
        logData("errors.txt", data);
    }

}


module.exports = {
    handleGenerateShortUrl,
    handleGetAnalytics,
    handleRedirectUrl
}
