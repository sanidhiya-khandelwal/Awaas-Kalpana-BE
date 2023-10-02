require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')

const healthRoute = require('./routes/HealthRoutes')
const authRoutes = require('./routes/AuthRoutes')

/**
 * APP
 */

var whitelist = ['http://localhost:5173']
var corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}


const app = express();
app.use(express.json())
app.use(cors(corsOptions));


/**
 * ROUTES
 */
app.use('/health', healthRoute)
app.use('/api/v1/auth', authRoutes)

/**
 * DATABASE CONNECTION
 */
mongoose.connect(process.env.DATABASE_URL)
mongoose.connection.once('connected', () => console.log('Database Connected'))
mongoose.connection.on('error', (er) => console.log('Database error : ', er))


/**
 * SERVER LISTEN
 */
app.listen(process.env.SERVER_PORT, () => console.log(`App server started at ${process.env.SERVER_PORT} port`))