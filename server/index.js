const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoute = require('./routes/userRoute')
const taskRoute = require('./routes/taskRoute')

const app = express();
app.use(express.json());
app.use(cors({
    origin:"*",
}))
dotenv.config();

const PORT = process.env.PORT || 4000;

app.use('/user',userRoute);
app.use('/task',taskRoute);

const connectDb = async()=>{
    try{
        const response = await mongoose.connect(`mongodb+srv://iharshgarg04:${process.env.PASSWORD}@taskmanagement.shzry1k.mongodb.net/?retryWrites=true&w=majority&appName=taskManagement`);
        if(response){
            console.log("Database connected Successfully");
        }
    }catch(error){
        console.log("Error while connecting to mongoDb");
    }
}
connectDb();

app.listen(PORT,()=>{
    console.log(`server is listening on PORT: `,PORT);
})