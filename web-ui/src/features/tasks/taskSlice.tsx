import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "example1",
    date: "2023-05-22",
    description: "description1",
    category: "category1",
    city: "city1",
    venue: "venue1",
    completed: false,
  },
  {
    id: "2",
    title: "example2",
    date: "2023-05-22",
    description: "description2",
    category: "category2",
    city: "city2",
    venue: "venue2",
    completed: true,
  },
];

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    editTask: (state, action) => {
      const {id, title, description} = action.payload;
      //console.log(action.payload);
      const taskFound = state.find(task => task.id === id);
      if(taskFound){
        console.log("found");
        taskFound.title = title;
        taskFound.description = description;
      }
    },
    deleteTask: (state, action) => {
      const taskFound = state.find(task => task.id === action.payload);
      if(taskFound) state.splice(state.indexOf(taskFound), 1);
    },
  },
});

export const { addTask, deleteTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;
