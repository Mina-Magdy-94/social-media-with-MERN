import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import { register } from "./controllers/auth.mjs"
import authRoutes from './routes/auth.mjs'
import userRoutes from './routes/users.mjs'
import postRoutes from './routes/posts.mjs'
import { verifyToken } from './middleware/auth.mjs'
import {createPost} from './controllers/posts.mjs'
import { User } from './models/User.mjs'
import { Post } from './models/posts.mjs'
import { users, posts } from './data/index.mjs'


// Configurations
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}))
app.use(morgan("common"))
app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cors())
app.use("/assets",express.static(path.join(__dirname,'public/assets')))


// File Storage
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/assets')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload=multer({storage})


// Routes With Files
app.post("auth/register",upload.single("picture"),register)
app.post("/posts",verifyToken,upload.single("picture"),createPost)

// Routes
app.use("auth",authRoutes)
app.use("/users",userRoutes)
app.use("/posts",postRoutes)



//Mongoose Setup
const PORT=process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    app.listen(PORT,()=>console.log(`Server connected at port ${PORT}`))


    // Add fake data one time
    // User.insertMany(users)
    // Post.insertMany(posts)
}).catch((error)=>console.log(error))

