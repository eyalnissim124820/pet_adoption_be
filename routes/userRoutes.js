const router = require('express').Router();
const UserController = require("../Controllers/userController")
const FavoritesController = require("../Controllers/favoritesController")

//GET ALL USER LIST
router.get('/', UserController.useGetAllUsers)

//GET SPECIFIC USER BY ID
router.get('/:id', UserController.useGetUserInfo)

//GET USERS PETS
router.post('/userpets/:id', UserController.useGetUserPets)

//DELETE USER BY ID
router.delete('/:id', UserController.useDeleteUser)

//UPDATE USER INFO
router.put('/:id', UserController.useUpdateUser)

//GET FAVORITES
router.get('/favorites/:id', FavoritesController.useGetFavorites)

//FOSTER
router.post('/foster', UserController.useFosterPet)

//RETURN
router.post('/return', UserController.useReturnPet)

//MAKE ADMIN
router.post('/role', UserController.useMakeAdmin)

module.exports = router;