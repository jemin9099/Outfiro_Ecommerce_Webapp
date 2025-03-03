const Product = require("../models/product");
const User = require("../models/user");
const Cart = require("../models/cart");
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.user._id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const findCurrentItemIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (findCurrentItemIndex === -1) {
      cart.products.push({ productId, quantity });
    } else {
      if(cart.products[findCurrentItemIndex].quantity < product.stock){
        cart.products[findCurrentItemIndex].quantity += quantity;
      }else{
        return res.status(400).json({ message: "Product out of stock" });
      }
    }
    await cart.save();
    res
      .status(201)
      .json({ success: true, message: "Product added to cart successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchCartItems = async (req, res) => {
  try {
    
    const userId = req.user.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const cartItems = await Cart.findOne({ userId }).populate("products.productId").lean().exec();
    if (!cartItems) {
      return res.status(200).json({ message: "Cart items not found" , data: [] });
    }

    const validatedCartItems = cartItems?.products?.filter(
      (item) => item.productId
    );

    if(validatedCartItems.length){
      if (validatedCartItems.length < cartItems?.products?.length) {
        cartItems.products = validatedCartItems;
        await cartItems.save();
      }
    }

    const populatedCartItems = validatedCartItems.map((item) => ({
      productId: item.productId._id,
      title: item.productId.title,
      salling_price: item.productId.salling_price,
      image: item.productId.image,
      price: item.productId.price,
      quantity: item.quantity,
      stock: item.productId.stock
    }));   

    res.status(200).json({
      data: {
        ...cartItems,
        products: populatedCartItems,
      },
      message: "Cart items fetched successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.user._id;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const findCurrentItemIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (findCurrentItemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    cart.products[findCurrentItemIndex].quantity = quantity;
    await cart.save();
    res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.user._id;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const findCurrentItemIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (findCurrentItemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    cart.products.splice(findCurrentItemIndex, 1);
    await cart.save();
    res.status(200).json({ message: "Cart product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports = {
  addToCart,
  fetchCartItems,
  updateCart,
  deleteCartItem
};
