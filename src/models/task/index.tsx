export interface TaskModel {
  id?: number;
  title?: string;
  isCompleted?: boolean;
  userId?: number;
}

export interface TaskFilterModel {
  q?: string;
  isCompleted?: boolean;
}
