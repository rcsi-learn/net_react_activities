import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../features/tasks/taskSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../app/store";

export const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector((state: RootState) => state.tasks);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (params.id) {
      console.log(task);
      dispatch(editTask({ id: params.id, ...task }));
    } else {
      dispatch(addTask({ id: uuid(), ...task }));
    }
    navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      const TaskFound = tasks.find((task) => task.id === params.id);
      setTask({
        title: TaskFound?.title!,
        description: TaskFound?.description!,
      });
    }
  }, [params.id, tasks]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="Title"
        type="text"
        placeholder="title"
        onChange={handleChange}
        value={task.title}
      />
      <input
        name="Date"
        type="date"
        placeholder="Date"
        onChange={handleChange}
        value={"2023-05-22"}
      />
      <textarea
        name="Description"
        placeholder="Description"
        onChange={handleChange}
        value={task.description}
      />
      <input
        name="Category"
        type="text"
        placeholder="Category"
        onChange={handleChange}
        value={""}
      />
      <input
        name="City"
        type="text"
        placeholder="City"
        onChange={handleChange}
        value={""}
      />
      <input
        name="Venue"
        type="text"
        placeholder="Venue"
        onChange={handleChange}
        value={""}
      />
      <input type="checkbox" checked={true} />
      <button>Save</button>
    </form>
  );
};
