import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const url="http://localhost:4000/api/tasks";

//GET Async operation
export const getTaskFromTheServer=createAsyncThunk(
  "tasks/getTaskFromTheServer",async(_,{rejectWithValue})=>{
    const response=await fetch(url);
    if(response.ok){
      const jsonResponse=await response.json();
      return jsonResponse;
    }else
      return rejectWithValue({error:"No Task Found"});
});

//POST Async operation
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

//PATCH Async operation

export const updateTaskInTheServer = createAsyncThunk(
  "tasks/updateTaskInTheServer",
  async (task, { rejectWithValue }) => {
    const options = {
      method: "PATCH",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };

    try {
      const response = await fetch(url+'/'+task.id, options);
  

      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
      } else {
        return rejectWithValue({ error: "Task Not Updated" });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      return rejectWithValue({ error: "Network Error" });
    }
  }
);

export const deleteTaskInTheServer=createAsyncThunk(
  "tasks/deleteTaskInTheServer",async(task,{rejectWithValue})=>{
    const options={
      method:"DELETE"
    };
    const response=await fetch(`${url}/${task.id}`,options);
    if(response.ok){
      const jsonResponse=await response.json();
      return jsonResponse;
    }else
    return rejectWithValue({ error: "Task Not Deleted" });
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
        state.error="";
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
        state.error="";
        state.taskList.push(action.payload);
      })
      .addCase(addTaskToTheServer.rejected,(state,action)=>{
        state.isLoading=false;
        state.error=action.payload.error;
      })
      .addCase(updateTaskInTheServer.pending,(state)=>{
        state.isLoading=true;
      })
      .addCase(updateTaskInTheServer.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.error="";
        state.taskList=state.taskList.map(task=>task.id===action.payload.id?action.payload:task);
      })
      .addCase(updateTaskInTheServer.rejected,(state,action)=>{
        state.isLoading=false;
        state.error=action.payload.error;
      })
      .addCase(deleteTaskInTheServer.pending,(state)=>{
        state.isLoading=true;
      })
      .addCase(deleteTaskInTheServer.fulfilled,(state)=>{
        state.isLoading=false;
        state.error="";
      })
      .addCase(deleteTaskInTheServer.rejected,(state,action)=>{
        state.isLoading=false;
        state.error=action.payload.error;
      })
    }
  
});

export const {addTaskToList,removeTaskFromList,updateTaskInTheList,setSelectedTask}=taskSlice.actions;
export default taskSlice.reducer;
