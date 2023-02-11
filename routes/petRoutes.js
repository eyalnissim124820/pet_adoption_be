const router = require('express').Router();
const PetController = require("../Controllers/petController")
const { upload } = require("../middlewares/pictureMiddleware")
const { typesBeforeAdd } = require('../middlewares/petsMiddleware')

const { validateBody } = require('../middlewares/validationMiddleware');
const petSchema = require("../Schema/Pet_schemaValidation");

//GET ALL PETS LIST
router.get('/', PetController.useGetAllPets);

//ADD NEW PET
router.post('/', upload.single('picture'), typesBeforeAdd, validateBody(petSchema), PetController.useAddNewPet);

//SAVE PET
router.post('/save', PetController.useMarkAsSaved);

//GET SPECIFIC PET BY ID
router.get('/:id', PetController.useGetPet);

//DELETE PET BY ID
router.delete('/:id', PetController.useDeletePet);

//UPDATE PET INFO
router.put('/update/:id', upload.single('picture'), typesBeforeAdd, PetController.usePetUpdate);

//SEARCH PETS WITH FILTERS
router.post('/filters', PetController.useFindPets);

module.exports = router;
