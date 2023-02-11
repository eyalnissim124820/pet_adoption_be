const User = require('../Schema/User_Schema');
const UserSavedPet = require('../Schema/user_saved_pet')
const { getPetInfo } = require('../models/petsModel')
const ObjectId = require('mongodb').ObjectId;


async function markAsSaved(userID, petID) {
    const findPets = await User.find({ _id: ObjectId(userID), saved_pets: petID })
    if (findPets[0]) {
        await User.findByIdAndUpdate(userID, { $pull: { saved_pets: petID } })
        return false;
    } else {
        await User.findByIdAndUpdate(userID, { $push: { saved_pets: petID } })
        return true
    }
}

async function getFavorites(id) {
    const favorites = await User.find({ _id: Object(id) }, { saved_pets: 1, _id: 0 })
    const list = favorites[0]?.saved_pets;
    return list;
}


module.exports = { markAsSaved, getFavorites }