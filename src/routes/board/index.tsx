import * as React from "react";
import { useAppState } from "store";
import AddNewTask from "./views/add-task";
import TaskList from "./views/tasks";

interface IBoardRouteProps {}

const BoardRoute: React.FunctionComponent<IBoardRouteProps> = (props) => {
  const { user } = useAppState((store) => store.Auth);

  

  return (
    <div className='w-full flex justify-center'>
      <div className='flex flex-col items-center w-full'>
        <div>
          <AddNewTask />
        </div>
        <div className="w-full max-w-lg mt-2 overflow-auto">
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default BoardRoute;
