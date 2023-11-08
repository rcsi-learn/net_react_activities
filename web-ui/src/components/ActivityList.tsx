import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { deleteTask } from "../features/tasks/taskSlice";
import { Link } from "react-router-dom";
import { useGetActivitiesQuery } from "../features/tasks/apiSlice";
import { ActivityItem } from "./ActivityItem";
import { Activity } from "../app/models/activity";
import { ActivityForm } from "./ActivityForm";
import { useState } from "react";

export const ActivityList = () => {
  const tasks = useSelector((state: RootState) => state.tasks);

  let activities: Array<Activity> = [];

  let activityProp = {
    id: "00000000-0000-0000-0000-000000000000",
    title: "",
    date: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`,
    description: "",
    category: "",
    city: "",
    venue: "",
    completed: false,
  };
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
    <div className="bg-slate-200 text-center">
      <header>
        <h1 className="uppercase font-sans text-2xl font-semibold">Ativities Count: {activities.length}</h1>
        <button className="font-sans hover:font-mono font-medium hover:font-semibold bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded" onClick={() => setOpen(true)}>Create task</button>
        {Open ? ( <ActivityForm key={activityProp.id} activityProp={activityProp} closePopup={() => setOpen(false)} />) : null}
      </header>
      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  );
};
