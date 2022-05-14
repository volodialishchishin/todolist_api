export interface TodolistType {
  id: string
  title: string
  user_id:string
}
export interface TaskType {
  id:string
  title:string
  status:number
  todoListId:string
}
export type UserModel = {
  id: number
  user_password: string
  user_name: string
};
