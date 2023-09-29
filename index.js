require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const healthRoute = require('./routes/HealthRoutes')

/**
 * APP
 */
const app = express();
app.use(express.json())
app.use('/health', healthRoute)

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