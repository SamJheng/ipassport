import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1727946615769 implements MigrationInterface {
    name = 'Generate1727946615769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "doctor_info" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "workPlace" character varying, "specialty" character varying, "title" character varying, "education" character varying, "experience" character varying, "treatmentScope" character varying, CONSTRAINT "PK_d8ffbc74bb293f013a931376816" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "doctorInfoId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_a614b83dfa3f7148ab014f1a115" UNIQUE ("doctorInfoId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_a614b83dfa3f7148ab014f1a115" FOREIGN KEY ("doctorInfoId") REFERENCES "doctor_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_a614b83dfa3f7148ab014f1a115"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_a614b83dfa3f7148ab014f1a115"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "doctorInfoId"`);
        await queryRunner.query(`DROP TABLE "doctor_info"`);
    }

}
