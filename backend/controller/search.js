const Product = require("../models/product");
const searchProducts = async (req, res) => {
    const { query } = req.query ;
    try {
        // if(!query || typeof query !== 'string'){ 

        //     return res.status(400).json({ message: "query is required and must be a string" });
        // }
        const products = await Product.find({
            $or: [
                { title: { $regex: query || '', $options: 'i' } },
                { description: { $regex: query || '', $options: 'i' } },
            ],
        });
        res.status(200).json({ message: "Products fetched successfully", data: products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { searchProducts };