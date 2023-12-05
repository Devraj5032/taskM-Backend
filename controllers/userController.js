const { User } = require("../models/userSchema")

exports.AllUser = async (req,res) => {
    const allUsers = await User.find().select("-password")

    return res.status(200).json({
        "status": "success",
        "length": allUsers.length,
        "users": allUsers
    })
}