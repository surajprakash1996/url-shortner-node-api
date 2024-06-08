const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const urlSchema = new Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    visitorHistory: [{ timestamp: { type: Number } }]

}, { timestamps: true });

const urlModel = model("url", urlSchema);

module.exports = urlModel;