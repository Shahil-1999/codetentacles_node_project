const express = require('express');
const {databaseConnection, sequelize} = require('./connections/connection')
const app = express()
require('dotenv').config()
require('./models');
const adminRoutes = require('./routes/admin-routes')
const sellerRoutes = require('./routes/seller-routes')
const port = process.env.PORT
sequelize.sync()

app.use(express.json());

app.use('/api/admin', adminRoutes)
app.use('/api/seller', sellerRoutes)

app.listen(port, ()=>{
    databaseConnection()
    console.log(`Server is running on http://localhost:${port}`);
})
