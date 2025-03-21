const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand