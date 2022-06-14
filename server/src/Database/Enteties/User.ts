import {
  BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { ToDoList } from './ToDoList';
import { Task } from './Task';

@Entity('User')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    id:number;

  @Column({
    unique: true,
  })
    name:string;

  @Column()
    password:string;

  @OneToMany(
    () => ToDoList,
    (todolist) => todolist.user,
  )
    todolist:ToDoList[];

  @OneToMany(
    () => Task,
    (task) => task.user,
  )
    task:Task[];
}
