import { TaskModel } from "models/task";
import * as React from "react";
import { useDeleteTaskMutation, useTaskMutation } from "services/tasks/hooks";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Check } from "@mui/icons-material";

interface ITaskItemProps {
  task: TaskModel;
}

const TaskItem: React.FunctionComponent<ITaskItemProps> = (props) => {
  const { task } = props;

  const { mutateAsync: deleteTaskAsync } = useDeleteTaskMutation();

  const { mutate: updateTask } = useTaskMutation();

  const handleDelete = async ($task: TaskModel) => {
    try {
      await deleteTaskAsync($task);
    } catch (error) {}
  };

  return (
    <div>
      <input className='peer hidden' type={"checkbox"} checked={!!task.isCompleted} />
      <div className='group px-3 py-1 mb-3 border border-slate-400 bg-slate-50 peer-checked:bg-green-100 peer-checked:bg-opacity-50 peer-checked:border-green-200 hover:bg-slate-100 transition-all hover:shadow-md shadow-indigo-100 hover:-translate-y-0.5 rounded'>
        <div className='flex w-full items-center justify-between'>
          <span className='text-lg py-2 px-1 text-gray-500 flex'>
            <input className='peer hidden' type={"checkbox"} checked={!!task.isCompleted} />
            <div className='group-hover:w-9 group-hover:opacity-100 peer-checked:w-9 peer-checked:opacity-100 peer-checked:text-green-500 w-0 opacity-0 transition-all text-center'>
              <IconButton onClick={() => task.id && updateTask({ ...task, isCompleted: !task.isCompleted })} className='text-current' color='inherit' aria-label='delete' size='small'>
                <Check fontSize={"medium"} color='inherit' />
              </IconButton>
            </div>
            <div className='group-hover:ml-2 peer-checked:ml-2 leading-8'>{task.title}</div>
          </span>
          <IconButton className='group-hover:opacity-100 opacity-0' onClick={() => task.id && handleDelete(task)} aria-label='delete' size='small'>
            <DeleteIcon fontSize='inherit' />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
