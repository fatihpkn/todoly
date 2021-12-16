import { TaskFilterModel, TaskModel } from "models/task";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AddTask, DeleteTask, GetTasks, UpdateTask } from "services/tasks";

export const useTasks = (queryFilter?: TaskFilterModel) => useQuery(["tasks"], () => GetTasks(queryFilter));

export const useTaskMutation = () => {
  const client = useQueryClient();

  const mutation = useMutation(UpdateTask, {
    onMutate: async (newTask) => {
      const tasks = client.getQueryData<TaskModel[]>(["tasks"]);

      if (tasks?.length) {
        const _indexInBoard = tasks.findIndex((t) => t.id === newTask?.id);

        tasks[_indexInBoard] = { ...tasks[_indexInBoard], ...newTask };
      }

      client.setQueryData(["tasks"], tasks);

      return () => tasks;
    },
    // @ts-ignore
    onError: (error, vars, rollback) => rollback(),
    onSuccess: () => {
      client.invalidateQueries(["tasks"]);
    },
  });

  return { ...mutation };
};

export const useNewTaskMutation = () => {
  const client = useQueryClient();

  const mutation = useMutation(AddTask, {
    onMutate: async (newTask) => {
      const tasks = client.getQueryData<TaskModel[]>(["tasks"]);

      const _task: TaskModel = { ...newTask, isCompleted: false };

      const newTasks = tasks?.length ? [_task, ...tasks] : [_task];

      client.setQueryData(["tasks"], newTasks);

      return () => tasks;
    },
    // @ts-ignore
    onError: (error, vars, rollback) => rollback(),
    onSuccess: () => {
      client.invalidateQueries(["tasks"]);
    },
  });

  return { ...mutation };
};

export const useDeleteTaskMutation = () => {
  const client = useQueryClient();

  const mutation = useMutation(DeleteTask, {
    onMutate: async (deletedTask) => {
      const tasks = client.getQueryData<TaskModel[]>(["tasks"]);

      const newTasks = tasks?.length ? tasks.filter((t) => t.id !== deletedTask.id) : [];

      client.setQueryData(["tasks"], newTasks);

      return () => tasks;
    },
    // @ts-ignore
    onError: (error, vars, rollback) => rollback(),
    onSuccess: () => {
      client.invalidateQueries(["tasks"]);
    },
  });

  return { ...mutation };
};
