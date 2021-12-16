import { TextField } from "@mui/material";
import { TaskModel } from "models/task";
import * as React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNewTaskMutation } from "services/tasks/hooks";

interface IAddNewTaskProps {}

const AddNewTask: React.FunctionComponent<IAddNewTaskProps> = (props) => {
  const { control, handleSubmit, setValue } = useForm<TaskModel>();

  const { mutateAsync } = useNewTaskMutation();

  const handleNewTask: SubmitHandler<TaskModel> = async (form) => {
    try {
      setValue("title", '');
      await mutateAsync(form);
    } catch (error) {
      console.error("Sorry, get an error", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleNewTask)}>
      <Controller control={control} name='title' render={({ field }) => <TextField {...field} label='New to do' placeholder='Type and press enter' />} />
      
    </form>
  );
};

export default AddNewTask;
