const userRoutes=require('./routes/user');
const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');


const app=express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/api/auth',userRoutes)

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   
}).then(()=>{
    console.log("Connected To MongoDB");
}).catch((err)=>{console.log(err.message)} );

// Server Connection
const server=app.listen(process.env.PORT,()=>{  
    console.log(`Server Started On The Port ${process.env.PORT}`);
})