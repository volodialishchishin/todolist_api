import {
  BaseEntity, Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Content')
export class Content extends BaseEntity {
  @PrimaryGeneratedColumn()
    id:number;

  @Column()
    title:string;
}
