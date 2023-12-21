const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    date: {
        default: Date.now()
    }
})

exports.Notification = mongoose.model("Notification" , notificationSchema)