import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { deleteTask } from "../features/tasks/taskSlice";
import { Link } from "react-router-dom";
import { useGetActivitiesQuery } from "../features/tasks/apiSlice";
import { Activity } from "../app/models/activity";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { ActivityForm } from "./ActivityForm";

export const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.tasks);

  let activities: Array<Activity> = [];
  let activityProp = {
    id: "",
    title: "",
    date: "",
    description: "",
    category: "",
    city: "",
    venue: "",
    completed: false,
  }

  const [Open, setOpen] = useState(false);

  const { data, isError, isLoading, error } = useGetActivitiesQuery("");
  if (isLoading) console.log("loading...");
  else if (isError) console.log("Error: " + error);
  else {
    activities = data.map((item: Activity) => ({
      id: item.id,
      title: item.title,
      date: item.date,
      description: item.description,
      category: item.category,
      city: item.city,
      venue: item.venue,
      completed: item.completed,
    }));
  }

  return (
    <div>
      <header>
        <h1>Task {tasks.length}</h1>
        <Link to="/create-task">Create task</Link>
          {Open ? <ActivityForm key={activityProp.id} activityProp={activityProp} closePopup={() => setOpen(false)} 	/> : null}
      </header>
      {/* {tasks.map((task) => (<TaskItem title="title" description="desc" />))} */}
      {/* {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <h5>{task.date}</h5>
          <p>{task.description}</p>
          <h5>{task.category}</h5>
          <h5>{task.city}</h5>
          <h5>{task.venue}</h5>
          <input type="checkbox" checked={task.completed}/>
          <button onClick={() => handleDelete(task.id)}>Delete</button>
          <Link to={`/edit-task/${task.id}`}>Edit</Link>
        </div>
      ))} */}
    </div>
  );
};
