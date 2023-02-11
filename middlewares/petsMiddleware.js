const Pet = require("../Schema/Pets_Schema");
const ObjectId = require('mongodb').ObjectId;

async function checkIfAvialble(req, res, next) {
    const user = (req.query.user);
    const pet = (req.query.pet);
    const wantedPet = await Pet.findById(pet)
    if (wantedPet.adoptionStatus == 'Available') {
        next()
    } else {
        res.status(400).send("Pet is not available");
    }
}

async function typesBeforeAdd(req, res, next) {
    req.body.height = Number(req.body.height)
    req.body.weight = Number(req.body.weight)
    req.body.hypoallergenic = Boolean(req.body.hypoallergenic)
    next()
}

async function checkIfFostered(req, res, next) {
    const { pet } = req.body;
    if (pet.adoptionStatus === "Fostered") {
        next()
    } else {
        res.status(400).send("Pet is alrady fostered");
    }
}


module.exports = { checkIfAvialble, checkIfFostered, typesBeforeAdd };
