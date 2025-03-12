const express = require('express')
const authToken = require('../middleware/authToken')
const upload = require("../config/multer");
const router = express.Router()

const {addBrand , getBrand , updateStatus , updateBrand , deleteBrand} = require('../controller/brand')

router.post('/add' , authToken , upload.single('file'), addBrand)
router.get('/all' , getBrand)
router.put('/updateStatus/:id' , authToken , updateStatus)
router.put('/:id' , authToken , upload.single('file'), updateBrand)
router.delete('/:id' , authToken , deleteBrand)

module.exports = router