const express=require('express');
const cors=require('cors');
const errorHandler=require('./middleware/errorHandler');


require('dotenv').config();

const app=express();

app.use(cors());
app.use(express.json());


app.get('/health',(req,res)=>{
    res.json({status:'ok',timestamp:new Date().toISOString()});
});

app.use((req,res)=>{
    res.status(404).json({error:"Route not found"});
});

app.use(errorHandler);
module.exports=app;


