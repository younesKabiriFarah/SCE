const mongoose = require('mongoose');

const FileScheme = new mongoose.Schema(
    {
        url: {
            type: String,
        },
        filename: {
            type: String
        },
    },
    {
        timesTamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("files",FileScheme)
