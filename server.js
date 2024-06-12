require(`dotenv`).config()
const app =  require(`./app`)

const mongoose = require(`mongoose`)
const port = process.env.PORT ||5000

mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log(`Database connected`)
})
.catch((err)=> {console.log(err)})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))