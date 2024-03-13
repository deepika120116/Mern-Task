const { error } = require('console');
const express=require('express');
const mongoose=require('mongoose');
const taskRouter=require('./routes/taskRoutes');
require("dotenv").config();
const app=express();

//To support the JSON format
app.use(express.json());
//Middleware
app.use((req,res,next)=>{
    console.log(`Path of the Request ${req.path} and method is ${req.method}`);
    next();
})
//Routing
app.get('/',(req,res)=>{
    res.send("Testing the routing through Get Method");
});


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Port and DB successfully connected ${process.env.PORT}`);
    });
}).catch(error=>console.log(error));

app.use("/api/tasks",taskRouter);