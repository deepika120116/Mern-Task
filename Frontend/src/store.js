import {configureStore} from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice';

const store=configureStore({
    reducer:{
        taskReducer:taskReducer
    }
});

export default store;