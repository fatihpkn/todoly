import * as React from "react";
import { useTasks } from "services/tasks/hooks";
import TaskItem from "./item";

interface ITaskListProps {}

const TaskList: React.FunctionComponent<ITaskListProps> = (props) => {
  const { data, isLoading } = useTasks();

  return (
    <div className='flex flex-col my-6'>
      {(data && data.length && data?.map((task) => <TaskItem task={task} />)) ||
        (!isLoading && (
          <div className='text-center text-gray-500 text-opacity-75 italic py-4 px-2'>
            <span>There is no to do item</span>
          </div>
        ))}
    </div>
  );
};

export default TaskList;
