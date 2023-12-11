const express = require('express')
const { SignUp, Login, forgotPassword, resetPassword } = require('../controllers/authController')
const Router = express.Router()

Router.route('/signup').post(SignUp)
Router.route('/login').post(Login)
Router.route('/forgotPassword').post(forgotPassword)
Router.route('/resetPassword').post(resetPassword)

module.exports = Router