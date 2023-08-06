import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1691325859762 implements MigrationInterface {
    name = 'Generate1691325859762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "log" ("id" SERIAL NOT NULL, "context" character varying NOT NULL, "message" character varying NOT NULL, "level" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_350604cbdf991d5930d9e618fbd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "log"`);
    }

}
