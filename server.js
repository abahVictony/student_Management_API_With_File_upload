require('dotenv').config()

const express = require('express')

const multer = require('multer')

const sequelize = require('./database/database')

const PORT = process.env.PORT || 1551

const studentRoutes = require('./routes/studentRoutes')

const app = express()

app.use(express.json())

app.use(studentRoutes)

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(400).json({
            messaage: err.message
        })
    }
})

const dbConnection = async()=>{
    try {
        await sequelize.authenticate()
        console.log('Connection To Server Established Successfully')

        
    } catch (error) {
        console.error('Failed To Connect To Server', error.meaasge)
        console.log(error.message)
    }
}

dbConnection()
app.listen(PORT, ()=>{
            console.log(`Server is running on PORT: ${PORT}`);
        })