import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectDB from './config/db.js';
import router from './routes/userRoutes.js';
import errorMiddleware from './middleware/error.middleware.js';



const app = express();



connectDB()
app.use(express.json()) //use for paras
app.use(express.urlencoded({
    extended:true
}))


app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization','Cookie'],

}))


app.use(cookieParser())
app.use('/api/v1/user' , router)
app.use(morgan('dev'))
 // ye morgan dependency se hum ye pta lga sakte hai ki mere website kaun se methods se access ho rhi hai
app.use('/ping' ,(req,res) =>{
    res.send('/pong')
})











app.all('*' ,(req,res) =>{
    res.status(404).send('OPPS!! 404 page not found')
})

app.use(errorMiddleware)
export default app