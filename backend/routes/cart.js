const express = require("express");
const authToken = require("../middleware/authToken");
const router = express.Router();

const {
  addToCart,
  fetchCartItems,
  updateCart,
  deleteCartItem,
} = require("../controller/cart");

router.post("/add", authToken, addToCart);
router.get("/all", authToken, fetchCartItems);
router.put("/update", authToken, updateCart);
router.delete("/:productId", authToken, deleteCartItem);

module.exports = router;
