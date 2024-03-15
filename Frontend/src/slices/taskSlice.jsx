import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const url="http://localhost:8000/task";

export const getTaskFromTheServer=createAsyncThunk(
  "tasks/getTaskFromTheServer",async(_,{rejectWithValue})=>{
    const response=await fetch(url);
    if(response.ok){
      const jsonResponse=await response.json();
      return jsonResponse;
    }else
      return rejectWithValue({error:"No Task Found"});
});

export const addTaskToTheServer=createAsyncThunk(
  "tasks/addTaskToTheServer",async(task,{rejectWithValue})=>{
    const options={
      method:"POST",
      body:JSON.stringify(task),
      headers:{
        "content-type":"application/json;charset=UTF-8"
      }
    };
    const response=await fetch(url,options);
    if(response.ok){
      const jsonResponse=await response.json();
      return jsonResponse;
    }else
      return rejectWithValue({error:"Task is not added"});
  }
);
const initialState = {
  taskList: [],
  selectedTask: {},
  isLoading:false,
  error:""
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
  extraReducers:(builder)=>{
    builder
      .addCase(getTaskFromTheServer.pending,state=>{
        state.isLoading=true;
      })
      .addCase(getTaskFromTheServer.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.taskList=action.payload;
      })
      .addCase(getTaskFromTheServer.rejected,(state,action)=>{
        state.isLoading=false;
        state.error=action.payload.error;
      })
      .addCase(addTaskToTheServer.pending,(state)=>{
        state.isLoading=true;
      })
      .addCase(addTaskToTheServer.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.taskList.push(action.payload);
      })
      .addCase(addTaskToTheServer.rejected,(state,action)=>{
        state.isLoading=false;
        state.error=action.payload.error;
      })
    }
  
});

export const {addTaskToList,removeTaskFromList,updateTaskInTheList,setSelectedTask}=taskSlice.actions;
export default taskSlice.reducer;
