const Review = require("../models/review");
const Product = require("../models/product");
const addReview = async (req, res) => {
    try {
        const { productId, rating, review } = req.body;
        const userId = req.user.user._id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const newReview = new Review({
            productId,
            userId,
            rating,
            review,
        });
        await newReview.save();
        res.status(201).json({ message: "Review added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const fetchReview = async (req, res) => {
    try {
        const productId = req.query.productId;
        
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const reviews = await Review.find({ productId }).sort({ createdAt: -1 }).populate("userId" ,'userName').lean().exec();
        res.status(200).json({ message: "Reviews fetched successfully", data: reviews });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const { rating, review } = req.body;
        const reviewToUpdate = await Review.findById(reviewId);
        if (!reviewToUpdate) {
            return res.status(404).json({ message: "Review not found" });
        }
        reviewToUpdate.rating = rating;
        reviewToUpdate.review = review;
        await reviewToUpdate.save();
        res.status(200).json({ message: "Review updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const reviewToDelete = await Review.findByIdAndDelete(reviewId);
        if (!reviewToDelete) {
            return res.status(404).json({
              success: false,
              message: "Review not found",
            });
          }
        
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = {
    addReview,
    fetchReview,
    updateReview,
    deleteReview
};