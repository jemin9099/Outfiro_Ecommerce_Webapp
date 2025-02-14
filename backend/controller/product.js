const product = require("../models/product");
const cloudinary = require("../config/cloudinary");

const addProduct = async (req, res) => {
  try {
    const { title, description, price, category, brand, salling_price, stock } =
      req.body;

    let featuredImage = "";
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "outFiro_products",
        resource_type: "auto",
      });
      featuredImage = uploadResult.secure_url;
    }

    const newProduct = new product({
      title,
      description,
      price,
      category,
      brand,
      salling_price,
      stock,
      image: featuredImage,
    });
    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const allProduct = async (req, res) => {
  try {
    let filter = {};
    let sortOption = {};

    // Extract filters from request query
    if (req.query.category) {
      filter.category = { $in: req.query.category }; // Matches any category in the array
    }
    if (req.query.brand) {
      filter.brand = { $in: req.query.brand }; // Matches any brand in the array
    }

    // Sorting logic (Default to price sorting if 'sort' is provided)
    if (req.query.sort === "highToLow") {
      sortOption = { salling_price: -1 };
    } else if (req.query.sort === "lowToHigh") {
      sortOption = { salling_price: 1 };
    } else if (req.query.sort === "a-z") {
      sortOption = { title: 1 };
    } else if (req.query.sort === "z-a") {
      sortOption = { title: -1 };
    }

    const page = parseInt(req.query.page) || 1;  // Default to page 1
    const limit = parseInt(req.query.limit) || 5; // Default to 10 items per page
    const skip = (page - 1) * limit;

    // Get total product count (before pagination)
    const totalProducts = await product.countDocuments(filter);

    // Pagination logic
    const from = (skip + 1);
    let end = (skip + limit) 
    const to = end < totalProducts ? end : totalProducts

    // Fetch products based on filters ,sorting and pagination
    const products = await product.find(filter).sort(sortOption).skip(skip).limit(limit).lean().exec();

    
    res.status(200).json({
      success: true,
      message: "All products",
      data: products,
      pagination: {
        totalProducts,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        perPage: limit,
        from:from,
        to:to
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const productId = req.params.id;
    const productDetail = await product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product found",
      data: productDetail,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { title, description, price, category, brand, salling_price, stock } =
      req.body;
    const productId = req.params.id;
    let featuredImage = "";
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "outFiro_products",
        resource_type: "auto",
      });
      featuredImage = uploadResult.secure_url;
    }
    const existingProduct = await product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const updatedProduct = await product.findByIdAndUpdate(
      productId,
      {
        title,
        description,
        price,
        category,
        brand,
        salling_price,
        stock,
        image: featuredImage || existingProduct.image,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { addProduct, allProduct, updateProduct, deleteProduct ,getById};
