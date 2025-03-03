const cloudinary = require("../config/cloudinary");
const Brand = require("../models/brand");
const addBrand = async (req, res) => {
    try {
        const { name , slug , status } = req.body;

        let featuredImage = "";
        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: "outFiro_brand",
                resource_type: "auto",
            });
            featuredImage = uploadResult.secure_url;
        }

        const newBrand = new Brand({ name , slug , status , image: featuredImage });
        await newBrand.save();
        res.status(201).json({ message: "Brand added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getBrand = async (req, res) => {
    try {
        
        let totalBrand = await Brand.countDocuments();

        const page = parseInt(req.query.page) || 1;  // Default to page 1
        const limit = parseInt(req.query.limit) || totalBrand; // Default to 10 items per page
        const skip = (page - 1) * limit;

        const from = (skip + 1);
        let end = (skip + limit) 
        const to = end < totalBrand ? end : totalBrand

        const brand = await Brand.find().skip(skip).limit(limit).lean().exec();;
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        res.status(200).json({ message: "Brand fetched successfully", data: brand , pagination: {
            total: totalBrand,
            currentPage: page,
            totalPages: Math.ceil(totalBrand / limit),
            perPage: limit,
            from:from,
            to:to
          }, });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const id = req.params.id;
        const brand = await Brand.findById(id);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        brand.status = status;
        await brand.save();
        res.status(200).json({ message: "Brand status updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });    
    }
}

const updateBrand = async (req, res) => {
    try {
        const { name , slug , status } = req.body;
        const id = req.params.id;
        let featuredImage = "";
        if (req.file) {
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: "outFiro_brand",
                resource_type: "auto",
            });
            featuredImage = uploadResult.secure_url;
        }
        const brand = await Brand.findById(id);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        brand.name = name;
        brand.slug = slug;
        brand.status = status;
        brand.image = featuredImage || brand.image;
        await brand.save();
        res.status(200).json({ message: "Brand updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });    
    }
}

const deleteBrand = async (req, res) => {
    try {
        const id = req.params.id;
        const brand = await Brand.findByIdAndDelete(id);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        res.status(200).json({ message: "Brand deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });    
    }
}

module.exports = {
    addBrand,
    getBrand,
    updateStatus,
    updateBrand,
    deleteBrand
}