const path = require('path');
const User = require('../Schema/User_Schema');
const Pet = require('../Schema/Pets_Schema');
const pathToUsersDB = path.resolve(__dirname, '../usersDB.json')
const { ObjectId } = require('mongodb');


async function getAllUsers() {
    try {
        const allUsers = await User.find()
        return allUsers;
    } catch (error) {
        console.error(error);
    }
}

async function getUserInfo(id) {
    try {
        if (!id) {
            console.log('no id');
        } else {
            const wantedUser = await User.findById(id);
            return (wantedUser);
        }
    } catch (error) {
        console.error(error);
    }
}

async function addNewUser(newUser) {
    try {
        await User.create(newUser)
        return true;
    } catch (error) {
        console.error(error)
    }
}

async function deleteUser(id) {
    try {
        await User.deleteOne({ _id: id })
        return true;
    } catch (error) {
        console.log(error)
    }
}

async function updateUser(id, contentToUpdate) {
    try {
        const updated = await User.findByIdAndUpdate(id, { ...contentToUpdate });
        return updated ? true : false;
    } catch (error) {
        console.log(error)
    }
    return true;
}

async function getUserByEmail(userEmail) {
    try {
        const checkUser = await User.exists({ email: userEmail })
        if (checkUser) {
            const wantedUser = await getUserInfo(checkUser._id)
            return (wantedUser);
        }
    } catch (error) {
        console.log(error);
    }
}

async function adoptPet(userId, petId) {
    const isAdopted = await User.find({ _id: ObjectId(userId), adopted_pets: petId })
    if (!isAdopted[0]) {
        await User.findByIdAndUpdate(userId, { $push: { adopted_pets: petId } })
        await Pet.findByIdAndUpdate(petId, { adoptionStatus: 'Adopted' })
        return true
    } else {
        return false
    }
}

async function fosterPet(userId, petId) {
    const isAdopted = await User.find({ _id: ObjectId(userId), adopted_pets: petId })
    if (!isAdopted[0]) {
        const isFostered = await User.find({ _id: ObjectId(userId), fostered_pets: petId })
        if (!isFostered[0]) {
            await User.findByIdAndUpdate(userId, { $push: { fostered_pets: petId } })
            await Pet.findByIdAndUpdate(petId, { adoptionStatus: 'Fostered' })
            return true
        } else {
            return false
        }
    }
}

async function returnPet(userId, petId) {
    const isFostered = await User.find({ _id: ObjectId(userId), fostered_pets: petId })
    const isAdopted = await User.find({ _id: ObjectId(userId), adopted_pets: petId })
    if (isFostered[0]) {
        await User.findByIdAndUpdate(userId, { $pull: { fostered_pets: petId } })
        await Pet.findByIdAndUpdate(petId, { adoptionStatus: 'Available' })
        return true
    }
    if (isAdopted[0]) {
        await User.findByIdAndUpdate(userId, { $pull: { adopted_pets: petId } })
        await Pet.findByIdAndUpdate(petId, { adoptionStatus: 'Available' })
    }
}

async function getUserPets(id) {
    const userPets = await User.find({ _id: ObjectId(id) }, { adopted_pets: 1, fostered_pets: 1, _id: 0 })
    const list = [...userPets[0].adopted_pets, ...userPets[0].fostered_pets];
    return list;
}

async function makeAdmin(userId) {
    const changed = await User.findByIdAndUpdate(userId, { user_role: 'admin' })
    return (true)
}

module.exports = { getAllUsers, addNewUser, deleteUser, getUserInfo, updateUser, getUserByEmail, adoptPet, fosterPet, returnPet, getUserPets, makeAdmin }