const Pet = require("../Schema/Pets_Schema")

async function getAllPets() {
    try {
        const allPets = await Pet.find()
        return (allPets);
    } catch (error) {
        console.log(error);
    }
}

async function getPetInfo(id) {
    try {
        const wantedPet = await Pet.findById(id);
        return (wantedPet);
    } catch (error) {
        console.log(error);
    }
}

function addNewPet(newPet) {
    try {
        Pet.insertMany(newPet);
        return true;
    } catch (error) {
        console.log(error);
    }
}

async function deletePet(id) {
    try {
        await Pet.deleteOne({ _id: id })
        console.log(id.id);
        return true;
    } catch (error) {
        console.log(error)
    }
}

async function updatePet(id, contentToUpdate) {
    try {
        await Pet.findByIdAndUpdate(id, { ...contentToUpdate });
    } catch (error) {
        console.log(error)
    }
    return true;
}

async function findPets(filters) {
    const { type, status, name, size } = filters
    const qType = type ? { type: `${type}` } : {}
    const qName = name ? { name: `${name}` } : {}
    const qStatus = status ? { adoptionStatus: `${status}` } : {}
    const qSize = (size === "S") ?
        { $and: [{ height: { $lt: 16 }, weight: { $lt: 11 } }] }
        :
        (size === "M") ?
            { $and: [{ height: { $gt: 15, $lt: 31 }, weight: { $gt: 10, $lt: 21 } }] }
            :
            (size === "L") ?
                { $and: [{ height: { $gt: 30 }, weight: { $gt: 20 } }] }
                : {}

    try {
        const res = await Pet.find({ $and: [qType, qName, qStatus, qSize] })
        if (res) {
            return res
        } else {
            return 'No Pets Found';
        }
    } catch (error) {
        console.log(error);
    }

}


module.exports = { getAllPets, addNewPet, deletePet, getPetInfo, updatePet, findPets }