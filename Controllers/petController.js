const { getAllPets, addNewPet, deletePet, getPetInfo, updatePet, findPets } = require('../models/petsModel')
const { markAsSaved, getFavorites } = require('../models/savedModel')



const useGetAllPets = async (req, res) => {
    try {
        const allPets = await getAllPets();
        res.send(allPets);
    } catch (error) {
        res.status(500).send(error.message)
    }
}
const useAddNewPet = (req, res, next) => {
    try {
        const formPet = req.body;
        const newPet = {
            ...formPet,
            adoptionStatus: "Available",
            picture: req.file?.path
        }
        const addedPet = addNewPet(newPet);
        if (addedPet) {
            res.send(newPet)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
};

const useGetPet = async (req, res) => {
    try {
        const petToFind = req.params;
        const wantedPet = await getPetInfo(petToFind.id);
        res.send(wantedPet);
    } catch (error) {
        res.status(500).send(error.message)
    }
};

const useDeletePet = (req, res) => {
    try {
        const petIdToDelete = req.params;
        const deletedPet = deletePet(petIdToDelete.id);
        if (deletedPet) {
            res.send(`pet with id:${JSON.stringify(petIdToDelete.id)} deleted.`);
        } else {
            res.status(518).send('You can not delete this pet')
        }
    } catch {
        res.status(500).send(error.message)
    }
};

const usePetUpdate = (req, res) => {
    try {
        const petToUpdate = req.params;
        const contentToUpdate = req.body;
        const updatedPet = updatePet(petToUpdate.id, contentToUpdate);
        if (updatedPet) {
            res.send(`pet with id:${JSON.stringify(petToUpdate.id)} updated.`);
        } else {
            res.status(518).send('You can not update this pet')
        }
    } catch {
        res.status(500).send(error.message)
    }
}

const useFindPets = async (req, res) => {
    try {
        const filters = req.body;
        const wantedPets = await findPets(filters);
        res.send(wantedPets);
    } catch (error) {
        res.status(500).send(error.message)
    }
};

const useMarkAsSaved = async (req, res) => {
    try {
        const { userID, petID } = req.body
        const saved = await markAsSaved(userID, petID);
        res.send(saved)
    } catch (error) {
        res.status(500).send(error.message)
    }
}



module.exports = { useGetAllPets, useAddNewPet, useGetPet, useDeletePet, usePetUpdate, useFindPets, useMarkAsSaved }