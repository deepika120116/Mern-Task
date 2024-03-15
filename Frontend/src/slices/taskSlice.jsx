import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const url="http://localhost:8000/tasks";

export const getTaskFromTheServer=createAsyncThunk(
  "tasks/getTaskFromTheServer",async(_,{rejectWithValue})=>{
    const response=await fetch(url);
    if(response.ok){
      const jsonResponse=await response.json();
      return jsonResponse;
    }else
      return rejectWithValue({error:"No Task Found"});
});
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
    }
  
});

export const {addTaskToList,removeTaskFromList,updateTaskInTheList,setSelectedTask}=taskSlice.actions;
export default taskSlice.reducer;
