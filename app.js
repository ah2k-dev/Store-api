require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')
//middleware
app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href = "/api/v1/products">Products</a>')
})
app.use('/api/v1/products', productsRouter)

//product routes
app.use(errorHandler)
app.use(notFound)

const port = process.env.PORT || 3000
const start = () => {
    try {
        connectDB(process.env.MONGO_URL)
        app.listen(port, () => console.log(`Server running on ${port}`))
    } catch (error) {
        console.log(error);
    }
}
start()