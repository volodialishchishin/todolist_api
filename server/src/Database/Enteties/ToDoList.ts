import {
  Entity, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';
import { Content } from './Content';
import { User } from './User';
import { Task } from './Task';

@Entity('ToDoList')
export class ToDoList extends Content {
  @ManyToOne(
    () => User,
    (user) => user.todolist,
  )

  @JoinColumn({
    name: 'user_id',
  })
    user : User;

  @OneToMany(
    () => Task,
    (task) => task.todolist,
  )
    task:Task[];
}
