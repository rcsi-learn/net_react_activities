import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { deleteTask } from "../features/tasks/taskSlice";
import { RootState } from "../app/store";
import { Activity } from "../app/models/activity";
import { ActivityForm } from "./ActivityForm";
import { Link } from "react-router-dom";
import { useGetActivitiesByIdQuery } from "../features/tasks/apiSlice";
//import { ActivityFormAnt } from "./ActivityFormAntxxx";
import { useDeleteActivityMutation } from "../features/tasks/apiSlice";

type Props = {
  activity: Activity;
};
export const ActivityItem = ({ activity }: Props) => {
  const tasks = useSelector((state: RootState) => state.tasks);
  //const dispatch = useDispatch();
  const [deleteActivity] = useDeleteActivityMutation();

  const [Open, setOpen] = useState(false);
  // const togglePopup = () => {
  //   setOpen(!Open);
  // };

  const [Active, setActive] = useState(false);
  const [prmActivity, setprmActivity] = useState(activity);

  const handleDelete = (id: string) => {
    //dispatch(deleteTask(id));
    deleteActivity(id);
  };

  // const HandleEdit = (id: string) => {
  //   setOpen(true);
  // };

  return (
    <div className="border border-sky-500">
      <div className="accordion-title">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3 style={{ width: "15%" }} className="uppercase font-bold">
            {activity.title}
          </h3>
          <div onClick={() => setActive(!Active)} className="font-bold">
            {Active ? "-" : "+"}
          </div>
        </div>
      </div>
      {Active && (
        <div>
          <label className="font-bold">Date: </label>
          <label>{activity.date?.toString().substring(0, 10)}</label>
          <br />
          <label className="font-bold">Description: </label>
          <label>{activity.description}</label>
          <br />
          <label className="font-bold">Category: </label>
          <label>{activity.category}</label>
          <br />
          <label className="font-bold">City: </label>
          <label>{activity.city}</label>
          <br />
          <label className="font-bold">Venue: </label>
          <label>{activity.venue}</label>
          <br />
          <label className="font-bold">Completed: </label>
          <input
            type="checkbox"
            checked={activity.completed}
            onChange={() => {}}
          />
          <br />
          <button className="font-sans hover:font-mono font-medium hover:font-semibold bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded" onClick={() => setOpen(true)} >
            Edit
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button className="font-sans hover:font-mono font-medium hover:font-semibold bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded" onClick={() => handleDelete(activity.id)} >
            Delete
          </button>
          {Open ? (
            <ActivityForm
              key={activity.id}
              activityProp={activity}
              closePopup={() => setOpen(false)}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};
