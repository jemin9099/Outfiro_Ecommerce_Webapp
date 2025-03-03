const express = require('express')
const authToken = require('../middleware/authToken')
const router = express.Router()
const upload = require("../config/multer");

const {addCategory ,getCategory , updateCategory , deleteCategory} = require('../controller/category')

router.post('/add' , authToken ,upload.single('file'), addCategory)
router.get('/all' , authToken , getCategory)
router.put('/:id' , authToken ,upload.single('file'), updateCategory)
router.delete('/:id' , authToken , deleteCategory)

module.exports = router