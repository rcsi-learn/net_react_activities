import React, { useEffect, useState } from "react";
import { Activity } from "../app/models/activity";
import { useGetActivitiesByIdQuery } from "../features/tasks/apiSlice";
import { ActivityForm } from "./ActivityForm";

type Props = {
  id: string;
  closePopup: () => void;
};
export const ActivityRequest = ({ id, closePopup }: Props) => {
  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    date: "",
    description: "",
    category: "",
    city: "",
    venue: "",
    completed: false,
  });
  const [show, setShow] = useState(false);
  useEffect(()=>{
    setShow(true);
  }, []);
  const {data, isError, isLoading, error} = useGetActivitiesByIdQuery(id);
  useEffect(()=>{
    if(isLoading){
        console.log("Loading.....");
    }else if(isError){
        console.log("Error: " + error);
    }else if(data){
        console.log(data);
        setActivity(data);
    }
  }, [data]);
  return(
    <ActivityForm key={activity.id} activityProp={activity} closePopup={() => closePopup}></ActivityForm>
  )
};
