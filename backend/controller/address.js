const Address = require("../models/address");
const User = require("../models/user");
const addAddress = async (req, res) => {
  try {
    const { address, city, phone, pincode, notes } = req.body;
    const userId = req.user.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newAddress = await Address({
      address,
      userId: userId,
      city,
      phone,
      pincode,
      notes,
    });
    await newAddress.save();
    res
      .status(201)
      .json({
        message: "Address added successfully",
        data: newAddress,
        success: true,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchAddress = async (req, res) => {
  try {
    const userId = req.user.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const address = await Address.find({ userId: userId });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res
      .status(200)
      .json({
        message: "Address fetched successfully",
        data: address,
        success: true,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { address, city, phone, pincode, notes } = req.body;
    const userId = req.user.user._id;
    const addressId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      { address, city, phone, pincode, notes },
      { new: true }
    );
    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res
      .status(200)
      .json({
        message: "Address updated successfully",
        data: updatedAddress,
        success: true,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const userId = req.user.user._id;
    const addressId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const deletedAddress = await Address.findByIdAndDelete(addressId);
    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res
      .status(200)
      .json({
        message: "Address deleted successfully",
        data: deletedAddress,
        success: true,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addAddress,
  fetchAddress,
  updateAddress,
  deleteAddress,
};
