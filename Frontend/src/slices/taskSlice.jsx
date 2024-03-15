import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskList: [],
  selectedTask: {},
};
let lastId=0;
const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    addTaskToList:(state,action)=>{
        const id=++lastId;
        const task={...action.payload,id};
        state.taskList.push(task);
    },
    removeTaskFromList:(state,action)=>{
        state.taskList=state.taskList.filter(task=>task.id!==action.payload.id);
    },
    updateTaskInTheList:(state,action)=>{
        state.taskList=state.taskList.map(task=>task.id===action.payload.id?action.payload:task);
    },
    setSelectedTask:(state,action)=>{
        state.selectedTask=action.payload;
    }
  },
});

export const {addTaskToList,removeTaskFromList,updateTaskInTheList,setSelectedTask}=taskSlice.actions;
export default taskSlice.reducer;
