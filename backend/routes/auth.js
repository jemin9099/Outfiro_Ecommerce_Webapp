const express = require('express');

const auth = express.Router();
const { register, login } = require('../controllers/auth');

auth.post('/register', register);
auth.post('/login', login);

module.exports = auth;