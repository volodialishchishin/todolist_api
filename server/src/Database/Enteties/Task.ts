import {
  Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { Content } from './Content';
import { User } from './User';
import { ToDoList } from './ToDoList';

@Entity('Task')
export class Task extends Content {
  @Column()
    status:number;

  @ManyToOne(
    () => User,
    (user) => user.task,
  )

  @JoinColumn({
    name: 'user_id',
  })
    user: User;

  @ManyToOne(
    () => ToDoList,
    (todolist) => todolist.task,
    {
      onDelete: 'CASCADE',
    },
  )

  @JoinColumn({
    name: 'todolist_id',
  })
    todolist:ToDoList;
}
