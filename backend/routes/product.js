const express = require('express')
const authToken = require('../middleware/authToken')
const router = express.Router()
const upload = require("../config/multer");

const {addProduct , allProduct , updateProduct , deleteProduct , getById} = require('../controller/product')
const {searchProducts} = require('../controller/search')

router.post('/add' , authToken , upload.single('file') , addProduct)
router.get('/all' , allProduct)
router.get('/search' , searchProducts)
router.get('/:id'  , getById)
router.put('/:id' , authToken , upload.single('file') , updateProduct)
router.delete('/:id' , authToken , deleteProduct)

module.exports = router