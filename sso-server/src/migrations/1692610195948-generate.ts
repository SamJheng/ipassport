import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1692610195948 implements MigrationInterface {
    name = 'Generate1692610195948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "object_access" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_f94d53b40e801c0ed4ad673b153" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "access" ("id" SERIAL NOT NULL, "roleId" integer, "objectId" integer, "userId" uuid, CONSTRAINT "REL_19d6048f0ccf9dc583e4f526cd" UNIQUE ("roleId"), CONSTRAINT "REL_c94190a5c5fe9cc0197dfedd22" UNIQUE ("objectId"), CONSTRAINT "PK_e386259e6046c45ab06811584ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "access" ADD CONSTRAINT "FK_19d6048f0ccf9dc583e4f526cd0" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "access" ADD CONSTRAINT "FK_c94190a5c5fe9cc0197dfedd229" FOREIGN KEY ("objectId") REFERENCES "object_access"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "access" ADD CONSTRAINT "FK_6e34c980647d3db8ea3455046cb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "access" DROP CONSTRAINT "FK_6e34c980647d3db8ea3455046cb"`);
        await queryRunner.query(`ALTER TABLE "access" DROP CONSTRAINT "FK_c94190a5c5fe9cc0197dfedd229"`);
        await queryRunner.query(`ALTER TABLE "access" DROP CONSTRAINT "FK_19d6048f0ccf9dc583e4f526cd0"`);
        await queryRunner.query(`DROP TABLE "access"`);
        await queryRunner.query(`DROP TABLE "object_access"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
