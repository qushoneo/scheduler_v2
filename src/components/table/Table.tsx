import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useFetchColumnsMutation,
  useFetchTasksMutation,
} from "../../redux/tableQuery";
import { IColumn, ITask } from "../../redux/types/table";
import Plus from "../../assets/signup/white_plus.svg";
import Cross from "../../assets/signup/black_cross.svg";
import Check from "../../assets/signup/black_check.svg";
import { BaseInput } from "../common/BaseInput";

export const Table = () => {
  const profile = useSelector(
    (state: RootState) => state.profileReducer.userData
  );

  const [columns, setColumns] = useState<IColumn[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isCreatingTask, setIsCreatingTask] = useState<boolean>(false);
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [newTaskColId, setNewTaskColId] = useState<number | null>(null);

  const [fetchColumns] = useFetchColumnsMutation();
  const [createTask] = useCreateTaskMutation();
  const [fetchTasks] = useFetchTasksMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const createTaskRequest = async () => {
    if (newTaskColId) {
      return await createTask({
        name: newTaskName,
        column_id: newTaskColId,
      }).unwrap();
    }
  };

  const startTaskCreating = (colId: number) => {
    setIsCreatingTask(true);
    setNewTaskColId(colId);
  };

  const finishTaskCreating = () => {
    createTaskRequest().then((new_task) => {
      if (new_task) {
        setTasks([...tasks, new_task]);
        setNewTaskColId(null);
        setNewTaskName("");
        setIsCreatingTask(false);
      }
    });
  };

  const cancelTaskCreating = () => {
    setIsCreatingTask(false);
    setNewTaskColId(null);
    setNewTaskName("");
  };

  const deleteTaskRequest = (id: number) => {
    deleteTask({ id: id })
      .unwrap()
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchColumns({})
        .unwrap()
        .then((response) => {
          setColumns(response);
        });
      fetchTasks({})
        .unwrap()
        .then((response) => {
          setTasks(response);
        });
    }
  }, []);

  return (
    <div className="flex-1 h-full flex pb-16 bg-sky-0">
      <div className="w-full h-full flex flex-1 gap-x-10 px-10 py-4">
        {columns.map((column) => (
          <div className="w-64 h-full b-1 border-black border rounded-2xl flex flex-col">
            <div className="flex flex justify-between items-center bg-black rounded-t-xl px-4">
              <p className="p-2 text-white">{column.name}</p>
              <img
                onClick={() => startTaskCreating(column.id)}
                className="cursor-pointer w-3"
                src={Plus}
              />
            </div>
            <div className="h-full w-full bg-neutral-100 rounded-b-2xl flex flex-col gap-4 py-4 px-3">
              {isCreatingTask && column.id === newTaskColId && (
                <div className="flex items-center gap-2">
                  <BaseInput
                    containerClassName="w-full my-2 px-3"
                    className="w-full"
                    fieldName="Task name"
                    value={newTaskName}
                    onChange={(e) => {
                      setNewTaskName(e.target.value);
                    }}
                    // onBlur={finishTaskCreating}
                  />
                  <img
                    // onClick={() => deleteTaskRequest(task.id)}
                    className="cursor-pointer w-6 mt-5"
                    src={Cross}
                    onClick={cancelTaskCreating}
                  />
                  <img
                    // onClick={() => deleteTaskRequest(task.id)}
                    className="cursor-pointer w-5 mt-5"
                    src={Check}
                    onClick={finishTaskCreating}
                  />
                </div>
              )}

              {tasks.map((task) => {
                if (task.column_id === column.id) {
                  return (
                    <div className="w-full h-16 px-4 py-1 border-y b-1 border-gray-800">
                      <div className="flex justify-between items-center">
                        <p>{task.name}</p>
                        <img
                          onClick={() => deleteTaskRequest(task.id)}
                          className="cursor-pointer w-5"
                          src={Cross}
                        />
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
