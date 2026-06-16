require('dotenv').config()

const cors=require('cors')
const express =require('express')
const cookieParser=require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const musicRoutes=require('./routes/music.route')

const app =express()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/music",musicRoutes)

module.exports=app
