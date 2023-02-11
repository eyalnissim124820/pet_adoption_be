const mongoose = require("mongoose");
const Pet = require('./Pets_Schema')

const savedSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    petID: { type: String, required: true },
    saved_date: {
        type: Date, default: () => Date.now()
    }
})

const UserSavedPet = mongoose.model("user_saved_pet", savedSchema);
module.exports = UserSavedPet;