const express = require('express')
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const cors = require('cors')
const mongoose = require('mongoose');

const app = express();
app.use(express.json())
app.use(cors({ origin: ["https://pet-adoption-fe-theta.vercel.app", "http://localhost:8080"], credentials: true }))

const petRoutes = require('./routes/petRoutes');
app.use('/pets', petRoutes);

const adoptRoute = require('./routes/adoptRoute');
app.use('/adopt', adoptRoute)

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const loginRoute = require('./routes/loginRoute');
app.use('/login', loginRoute)

const signUpRoute = require('./routes/signUpRoute');
app.use('/signup', signUpRoute)

const tokenRoute = require('./routes/tokenRoute');
app.use('/token', tokenRoute)

async function init() {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI, { dbName: "pet_adoption" });
        if (connection.connections[0].host) {
            console.log('Connected to DB');
            app.listen(PORT, () => {
                console.log('Listening on port ' + PORT);
            });
        }
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

init()

module.exports = app;