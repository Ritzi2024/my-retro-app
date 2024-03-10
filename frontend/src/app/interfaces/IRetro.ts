export interface IAction {
  title: string;
  taskId: string;
}
export default interface IRetro {
  _id: string;
  title: string,
  date: string,
  good: string[],
  ok: string[],
  actions: IAction[],
}
