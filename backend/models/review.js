const mogoose = require('mongoose')

const reviewSchema = new mogoose.Schema({
    userId: {
        type: mogoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    productId: {
        type: mogoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const Review = mogoose.model("Review", reviewSchema)

module.exports = Review