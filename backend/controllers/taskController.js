const mongoose = require('mongoose');
const taskModel=require('../models/TaskModel');

//POST Request
const createTask=async(req,res)=>{
    const {title,description}=req.body;
    try{
        const task= await taskModel.create({title,description});
        res.status(200).json(task);
    }catch(e){
        res.status(400).json({erroe:e.message});
    }
};

//GET Method- All
const getTasks=async(req,res)=>{
    try{
        const tasks=await taskModel.find({});
        res.status(200).json(tasks);
    }catch(e){
        res.status(400).json({error:e.message});
    }
};

//Get Method-Single Task
const getSingleTask=async(req,res)=>{
    const {_id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json({message:"Task not found"});
    try{
        const singleTask=await taskModel.findById({_id});
        res.status(200).json(singleTask);
    }catch(e){
        res.status(400).json({error:e.message});
    }
}
module.exports={createTask,getTasks,getSingleTask};