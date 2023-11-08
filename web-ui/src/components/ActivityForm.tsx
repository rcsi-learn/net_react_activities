import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Activity } from "../app/models/activity";
import React, { useEffect, useState } from "react";
import { RootState } from "../app/store";
import { useGetActivitiesByIdQuery } from "../features/tasks/apiSlice";
import popupStyles from "./FormPopup.module.css";
import {
  useCreateActivityMutation,
  useUpdateActivityMutation,
} from "../features/tasks/apiSlice";

type Props = {
  activityProp: Activity;
  closePopup: () => void;
};
export const ActivityForm = ({ activityProp, closePopup }: Props) => {
  const [activity, setActivity] = useState<Activity>(activityProp);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const [createActivity] = useCreateActivityMutation();
  const [updateActivity] = useUpdateActivityMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name == "completed") {
      setActivity({ ...activity, completed: !activity.completed });
    } else {
      setActivity({ ...activity, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = (e: React.SyntheticEvent) => {
    console.log("submit");
    console.log(activity);
    e.preventDefault();
    if (activity.id == "00000000-0000-0000-0000-000000000000") {
      console.log("create");
      createActivity(activity);
    } else {
      console.log("update");
      updateActivity(activity);
    }
    setShow(false);
  };

  return (
    <div
      style={{
        visibility: show ? "visible" : "hidden",
        opacity: show ? "1" : "0",
      }}
      className={popupStyles.overlay}
    >
      <div className={popupStyles.popup}>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            type="text"
            placeholder="title"
            onChange={handleChange}
            value={activity.title}
          />
          <span className={popupStyles.close} onClick={closePopup}>
            &times;
          </span>
          <input
            name="date"
            type="date"
            placeholder="Date"
            onChange={handleChange}
            value={activity.date.split("T")[0]}
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            value={activity.description}
          />
          <input
            name="category"
            type="text"
            placeholder="Category"
            onChange={handleChange}
            value={activity.category}
          />
          <input
            name="city"
            type="text"
            placeholder="City"
            onChange={handleChange}
            value={activity.city}
          />
          <input
            name="venue"
            type="text"
            placeholder="Venue"
            onChange={handleChange}
            value={activity.venue}
          />
          <input
            name="completed"
            type="checkbox"
            checked={activity.completed}
            onChange={handleChange}
          />
          <button>Save</button>
        </form>
      </div>
    </div>
  );
};
