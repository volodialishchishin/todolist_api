import {Request, Response} from "express";

const db = require('../db')


export class todoRepository {
    async InsertToDoList(req: Request, res: Response) {
        const {title} = req.body;
        const newToDoList = await db.query('INSERT INTO todolists(title) values($1) RETURNING * ', [title])
        return res.json(newToDoList.rows[0])
    }

    async selectToDoLists(req: Request, res: Response) {
        const todolists = await db.query('SELECT * FROM todolists')
        res.json(todolists.rows)
    }

    async deleteTodolist(req: Request, res: Response) {
        const id = req.params.id
        const deletedToDolist =  await db.query('DELETE FROM todolists WHERE id = $1; ', [id] )
        res.json(deletedToDolist)
    }


    async updateTodolist(req: Request, res: Response) {
        const id = req.params.id
        const {title} = req.body
        const updatedToDolist =  await db.query('UPDATE todolists SET title=$2 WHERE id = $1 RETURNING *', [id,title])
        res.json(updatedToDolist)
    }

    async insertTask(req: Request, res: Response) {
        const id = req.params.id
        const status = 0
        const {title} = req.body;
        const newTask = await db.query('INSERT INTO tasks(title,todolistid,status) values($1,$2,$3) RETURNING * ', [title,id,status])
        res.json(newTask.rows[0])
    }

    async selectTasks(req: Request, res: Response) {
        const id = req.params.id
        const newTask = await db.query('SELECT * FROM tasks where todolistid = $1', [id])
        res.json(newTask.rows)
    }

    async updateTask(req: Request, res: Response) {
        const id = req.params.id
        const taskid = req.params.taskid
        const {title,status} = req.body
        console.log(status)
        const updatedTask =  await db.query('UPDATE tasks SET title=$1 , status = $2   where todolistid = $3 and id = $4 RETURNING *', [title,status,id,taskid])
        res.json(updatedTask.rows)
    }

    async deleteTask(req: Request, res: Response) {
        const id = req.params.id
        console.log('zdarova')
        const taskid = req.params.taskid
        console.log(taskid)
        const newTask = await db.query('DELETE  FROM tasks where todolistid = $1 and id = $2', [id,taskid])
        res.json(newTask.rows)
    }

}


