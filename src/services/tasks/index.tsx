import { API } from "API";
import { TaskFilterModel, TaskModel } from "models/task";

export async function AddTask(task: TaskModel) {
  return API.post(`664/tasks`, task);
}

export async function GetTasks(queryFilter?: TaskFilterModel) {
  const defaultParams = { _sort: "id", _order: "desc" };
  return API.get<TaskModel[]>(`660/tasks`, { params: { ...queryFilter, ...defaultParams } });
}

export async function UpdateTask(task: TaskModel) {
  return API.patch(`664/tasks/${task.id}`, task);
}

export async function DeleteTask(task: TaskModel) {
  return API.delete(`664/tasks/${task.id}`);
}
