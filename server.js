const express = require('express')
const mongoose = require('mongoose')
const dotev = require('dotenv').config()
const cors = require('cors')

const app = express()
port = process.env.PORT || 3400
const MD_URL = 'mongodb+srv://aalan_29_4:Twoninefour_294@cluster0.gm0s9hy.mongodb.net/chats?retryWrites=true&w=majority'

app.use(cors())
app.use((req,res,next)=>{
    console.log(`${req.url} ${req.method}`)
    next()
})
app.use(express.json())
app.use('/',require('./ROUTERS/showUsersRouter'))
app.use('/auth',require('./ROUTERS/authRouter'))


const main = async()=>{
    await mongoose.connect(MD_URL).then(()=>{
        console.log("successfully connected to the database")
        app.listen(port,()=>{
            console.log(`listening to port ${port}`)
        })
    })
}
main().catch(err => console.log(err.message))