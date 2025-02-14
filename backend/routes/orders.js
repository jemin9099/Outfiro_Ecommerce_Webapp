const express = require('express')
const router = express.Router()
const authToken = require("../middleware/authToken");

const {createOrder , capturePayment , fetchOrders , updateOrderStatus} = require('../controller/orders')

router.post('/create' , authToken , createOrder)
router.post('/capture' , authToken , capturePayment)
router.get('/all' , authToken , fetchOrders)
router.put('/:id' , authToken , updateOrderStatus)

module.exports = router