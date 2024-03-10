import { TODOS_CATEGORY, TODOS_CRITERIA } from '../enums/dashboard';

export default interface ITodo {
  _id: string;
  category: TODOS_CATEGORY,
  criteria: TODOS_CRITERIA,
  title: string,
  description: string,
  updated: string,
  completed: boolean,
  star: boolean,
  tasks: string[]
}

export default interface IDashboardCount{
  title: string,
  count: number,
  activeCount: number
}

interface ITodoCount{
  _id: string;
  todos: ITodo[];
}

export interface IDashboardResponse {
  getTodoCounts: ITodoCount[];
}

export interface ITask {
  id: string;
  title: string;
}
