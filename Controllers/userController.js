const { getAllUsers, getUserInfo, deleteUser, updateUser, adoptPet, fosterPet, returnPet, getUserPets, makeAdmin } = require('../models/usersModel')
const { getPetInfo } = require('../models/petsModel');

const useGetAllUsers = async (req, res) => {
    try {
        const allUsers = await getAllUsers();
        res.send(allUsers);
    } catch (error) {
        res.status(500).send(error.message)
    }
};

const useGetUserInfo = async (req, res) => {
    try {
        const userToFind = req.params;
        const wantedUser = await getUserInfo(userToFind.id);
        res.send(wantedUser);
    } catch (error) {
        res.status(500).send(error.message)
    }
};

const useDeleteUser = (req, res) => {
    try {
        const userIdToDelete = req.params;
        const deletedUser = deleteUser(userIdToDelete.id);
        if (deletedUser) {
            res.send(`user with id:${JSON.stringify(userIdToDelete.id)} deleted.`);
        } else {
            res.status(518).send('You can not delete this user')
        }
    } catch {
        res.status(500).send(error.message)
    }
}

const useUpdateUser = (req, res) => {
    try {
        const userToUpdate = req.params;
        const contentToUpdate = req.body;
        const updatedUser = updateUser(userToUpdate.id, contentToUpdate);
        if (updatedUser) {
            res.send(`User with id:${JSON.stringify(userToUpdate.id)} updated.`);
        } else {
            res.status(518).send('You can not update this user')
        }
    } catch {
        res.status(500).send(error.message)
    }
}

async function login(req, res) {
    try {
        const { user, token } = req.body;
        res.send({ name: user.name, token: token })
    } catch (error) {
        res.status(500).send(error)
    }
}

async function useGetUserPets(req, res) {
    try {
        const { id } = req.params;
        const PetsId = await getUserPets(id);
        const pets = [];
        for (let i = 0; i < PetsId.length; i++) {
            pets?.push((await getPetInfo(PetsId[i])))
        }
        res.send(pets)
    } catch (error) {
        console.log(error)
    }
}

async function useAdoptPet(req, res) {
    try {
        const user = (req.query.user);
        const pet = (req.query.pet);
        const adopted = await adoptPet(user, pet);
        res.send(adopted);
    } catch (error) {
        console.log(error);
    }
}

async function useFosterPet(req, res) {
    try {
        const { user, pet } = req.body;
        const fostered = await fosterPet(user?.userId, pet?._id);
        res.send(fostered);
    } catch (error) {
        console.log(error);
    }
}

async function useReturnPet(req, res) {
    try {
        const { user, pet } = req.body;
        const returned = await returnPet(user?.userId, pet?._id);
        res.send(returned);
    } catch (error) {
        console.log(error)
    }
}

async function useMakeAdmin(req, res) {
    const userId = req.query.userId;
    try {
        const isAdmin = await makeAdmin(userId);
        res.send(isAdmin);
    } catch (error) {
        console.log(error)
    }
}

module.exports = { useGetAllUsers, useGetUserInfo, useDeleteUser, useUpdateUser, login, useAdoptPet, useFosterPet, useReturnPet, useGetUserPets, useMakeAdmin }