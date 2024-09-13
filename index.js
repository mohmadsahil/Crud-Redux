import express, { Router } from 'express'
import {DBConnect} from './DB Connections/connections.js'
import cors from 'cors'
import cloudinary from 'cloudinary'
import fileUpload from 'express-fileupload'
import {config} from 'dotenv'
import CardRoutes from './Routes/CardRoutes.js'
config({path:'./Config/Config.env'})
const app = express();


//Middlewares
app.use(cors());
app.use(express.json());

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use("/api",CardRoutes);


//DB Connect
DBConnect();

//Cloudinary Connect
cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

console.log('Cloudinary Config :',cloudinary.config());


app.listen(process.env.PORT,(req,res)=>{
    console.log(`App is Running on PORT : ${process.env.PORT || 8000}`);
})