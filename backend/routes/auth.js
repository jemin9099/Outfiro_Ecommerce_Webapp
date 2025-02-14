const express = require('express')
const authToken = require('../middleware/authToken')
const router = express.Router()

const {Register , Login , currentUser} = require('../controller/auth')

router.post('/register' , Register)
router.post('/login' , Login)
router.get('/current-user' , authToken , currentUser)
module.exports = router