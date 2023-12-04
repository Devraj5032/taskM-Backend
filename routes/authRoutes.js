const express = require('express')
const { SignUp, Login } = require('../controllers/authController')
const Router = express.Router()

Router.route('/signup').post(SignUp)
Router.route('/login').post(Login)

module.exports = Router