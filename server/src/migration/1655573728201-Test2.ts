import { MigrationInterface, QueryRunner } from "typeorm";

export class Test21655573728201 implements MigrationInterface {
    name = 'Test21655573728201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Task" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "zdarova" character varying NOT NULL, "status" integer NOT NULL, "user_id" integer, "todolist_id" integer, CONSTRAINT "PK_95d9364b8115119ba8b15a43592" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ToDoList" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "zdarova" character varying NOT NULL, "user_id" integer, CONSTRAINT "PK_02359fff9f3600a32320f5b835b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_99f220333df04d5f74f6db26c07" UNIQUE ("name"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Task" ADD CONSTRAINT "FK_5b6ddc9679be0517aad7b88f4e6" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Task" ADD CONSTRAINT "FK_26cc04dbbededb280e08d185fea" FOREIGN KEY ("todolist_id") REFERENCES "ToDoList"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ToDoList" ADD CONSTRAINT "FK_ce64e058f507ce90010fbebd560" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ToDoList" DROP CONSTRAINT "FK_ce64e058f507ce90010fbebd560"`);
        await queryRunner.query(`ALTER TABLE "Task" DROP CONSTRAINT "FK_26cc04dbbededb280e08d185fea"`);
        await queryRunner.query(`ALTER TABLE "Task" DROP CONSTRAINT "FK_5b6ddc9679be0517aad7b88f4e6"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "ToDoList"`);
        await queryRunner.query(`DROP TABLE "Task"`);
    }

}
