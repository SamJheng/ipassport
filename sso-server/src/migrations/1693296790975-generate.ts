import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1693296790975 implements MigrationInterface {
    name = 'Generate1693296790975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "access" DROP CONSTRAINT "FK_6e34c980647d3db8ea3455046cb"`);
        await queryRunner.query(`ALTER TABLE "access" ADD CONSTRAINT "FK_6e34c980647d3db8ea3455046cb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "access" DROP CONSTRAINT "FK_6e34c980647d3db8ea3455046cb"`);
        await queryRunner.query(`ALTER TABLE "access" ADD CONSTRAINT "FK_6e34c980647d3db8ea3455046cb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
