const cloudinary = require("../config/cloudinary");
const Category = require("../models/category");
const addCategory = async (req, res) => {
  try {
    const { name, slug, description, status } = req.body;
    const parent_id = req.body.parent_id == "null" ? null : req.body.parent_id;
    let featuredImage = "";
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "outFiro_category",
        resource_type: "auto",
      });
      featuredImage = uploadResult.secure_url;
    }
    const newCategory = new Category({
      name,
      slug,
      description,
      status,
      parent_id,
      image: featuredImage,
    });
    await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Category added successfully",
      data: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const buildCategoryHierarchy = async (parentCategoryId = null) => {
  const categories = await Category.find({
    parent_id: parentCategoryId,
  });

  // Build the category hierarchy
  const categoryHierarchy = [];

  for (const category of categories) {
    const categoryData = {
      name: category.name,
      _id: category._id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      status: category.status,
      image: category.image,
      parent_id: category.parent_id,
      subCategory: await buildCategoryHierarchy(category._id), // Recursive call to fetch subcategories
    };
    categoryHierarchy.push(categoryData);
  }

  return categoryHierarchy;
};

const getCategory = async (req, res) => {
  try {
    const categoryHierarchy = await buildCategoryHierarchy();
    res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: categoryHierarchy,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name, slug, description, status } = req.body;
    const categoryId = req.params.id;
    const parent_id = req.body.parent_id == "null" ? null : req.body.parent_id;
    let featuredImage = "";
    if (req.file) {
      const uploadResult = cloudinary.uploader.upload(req.file.path, {
        folder: "outFiro_category",
        resource_type: "auto",
      });
      featuredImage = uploadResult.secure_url;
    }
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    const newCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        name,
        slug,
        description,
        status,
        parent_id,
        image: featuredImage || existingCategory.image,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
