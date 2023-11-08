import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ActivityList } from "./components/ActivityList";

function App() {
  return (
    // <div className="App" style = {{height:"100vh"}}>
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ActivityList />} />
          {/* <Route path="/create-activity" element={<ActivityForm />} /> */}
          {/* <Route path="/edit-activity/:id" element={<ActivityForm />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
