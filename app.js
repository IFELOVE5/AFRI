const express = require('express')

const app = express()
const morgan = require(`morgan`)


app.use(morgan(`dev`))

const productRoute = require(`./routes/products_routes.js`)
const orderRoute = require(`./routes/order_routes`)
const userRoute = require(`./routes/user_routes.js`)
const errorHandler = require('./error_handler.js')
const cors = require("cors");



app.use(
    cors({
      origin: "*",
      credentials: true,
      allowedHeaders: "*",
    })
  );
  
  app.options("*", cors());

  
app.use
app.use(errorHandler)
app.use(express.json({ extended: true }))
app.use(`/uploads`, express.static(`uploads`))

app.use(`/api/v1/products`, productRoute)
app.use(`/api/v1/orders`, orderRoute)
app.use(`/api/v1/users`, userRoute)




app.use((req, res, next) => {
    res.status(404).send({
      status: 404,
      error: "Not Found",
    });
  });
  
module.exports = app