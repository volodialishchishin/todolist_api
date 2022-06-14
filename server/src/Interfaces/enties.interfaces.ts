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
  id: string
  user_password: string
  user_name: string
};

export interface DbConfig {
  type: string
  username: string
  password: string
  host: string
  port: number
  database: string
}
