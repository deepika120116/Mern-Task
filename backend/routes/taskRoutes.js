const express=require('express');
const { createTask, getTasks, getSingleTask, updateTask, deleteTask } = require('../controllers/taskController');
const router=express.Router();

router.post('/',createTask);
router.get('/',getTasks);
router.get('/:_id',getSingleTask);
router.patch('/:id',updateTask);
router.delete('/:id',deleteTask);

module.exports=router;