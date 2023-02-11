const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    saved_pets: [mongoose.Types.ObjectId],
    adopted_pets: [mongoose.Types.ObjectId],
    fostered_pets: [mongoose.Types.ObjectId],
    user_role: { type: String, enum: ["user", "admin"], default: "user" }
})

const User = mongoose.model("User", userSchema)
module.exports = User;