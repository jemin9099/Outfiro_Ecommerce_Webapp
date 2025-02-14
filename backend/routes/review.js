const express = require('express')
const authToken = require('../middleware/authToken')
const router = express.Router()

const {addReview , fetchReview , updateReview , deleteReview} = require('../controller/review')

router.post('/add' , authToken , addReview)
router.get('/all' , fetchReview)
router.put('/:id' , authToken , updateReview)
router.delete('/:id' , authToken , deleteReview)

module.exports = router
