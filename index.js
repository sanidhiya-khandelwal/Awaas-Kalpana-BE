require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')

const healthRoute = require('./routes/HealthRoutes')
const authRoutes = require('./routes/AuthRoutes')

/**
 * APP
 */



const app = express();
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: ['https://awaas-kalpana.vercel.app/']
}));


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