const { getFavorites } = require('../models/savedModel')
const { getPetInfo } = require('../models/petsModel')

const useGetFavorites = async (req, res) => {
    try {
        const { id } = req.params;
        const favoritsId = await getFavorites(id);
        const favorites = [];
        for (let i = 0; i < favoritsId.length; i++) {
            favorites?.push((await getPetInfo(favoritsId[i])))
        }
        res.send(favorites)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { useGetFavorites }