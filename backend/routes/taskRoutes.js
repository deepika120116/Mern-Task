const express=require('express');
const { createTask, getTasks, getSingleTask } = require('../controllers/taskController');
const router=express.Router();

router.post('/',createTask);
router.get('/',getTasks);
router.get('/:_id',getSingleTask);

module.exports=router;