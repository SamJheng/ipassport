import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1692615309699 implements MigrationInterface {
    name = 'Generate1692615309699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "access" DROP CONSTRAINT "FK_19d6048f0ccf9dc583e4f526cd0"`);
        await queryRunner.query(`ALTER TABLE "access" DROP CONSTRAINT "FK_c94190a5c5fe9cc0197dfedd229"`);
        await queryRunner.query(`ALTER TABLE "access" DROP CONSTRAINT "REL_19d6048f0ccf9dc583e4f526cd"`);
        await queryRunner.query(`ALTER TABLE "access" DROP CONSTRAINT "REL_c94190a5c5fe9cc0197dfedd22"`);
        await queryRunner.query(`ALTER TABLE "access" ADD CONSTRAINT "FK_19d6048f0ccf9dc583e4f526cd0" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "access" ADD CONSTRAINT "FK_c94190a5c5fe9cc0197dfedd229" FOREIGN KEY ("objectId") REFERENCES "object_access"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "access" DROP CONSTRAINT "FK_c94190a5c5fe9cc0197dfedd229"`);
        await queryRunner.query(`ALTER TABLE "access" DROP CONSTRAINT "FK_19d6048f0ccf9dc583e4f526cd0"`);
        await queryRunner.query(`ALTER TABLE "access" ADD CONSTRAINT "REL_c94190a5c5fe9cc0197dfedd22" UNIQUE ("objectId")`);
        await queryRunner.query(`ALTER TABLE "access" ADD CONSTRAINT "REL_19d6048f0ccf9dc583e4f526cd" UNIQUE ("roleId")`);
        await queryRunner.query(`ALTER TABLE "access" ADD CONSTRAINT "FK_c94190a5c5fe9cc0197dfedd229" FOREIGN KEY ("objectId") REFERENCES "object_access"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "access" ADD CONSTRAINT "FK_19d6048f0ccf9dc583e4f526cd0" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
