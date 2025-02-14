const express = require("express");
const authToken = require("../middleware/authToken");
const router = express.Router();

const {addAddress, fetchAddress, updateAddress, deleteAddress,} = require("../controller/address");

router.post("/add", authToken, addAddress);
router.get("/all", authToken, fetchAddress);
router.put("/:id", authToken, updateAddress);
router.delete("/:id", authToken, deleteAddress);

module.exports = router;