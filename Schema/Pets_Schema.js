const mongoose = require("mongoose")

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    color: { type: String, required: true },
    hypoallergenic: { type: Boolean, required: true },
    breed: { type: String, required: true },
    dietery: { type: String, required: true },
    bio: { type: String, required: true },
    picture: { type: String, required: false },
    adoptionStatus: { type: String, enum: ["Available", "Foster", "Adopted"], default: "Available" },
})

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;       