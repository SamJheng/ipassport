import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1726133804831 implements MigrationInterface {
    name = 'Generate1726133804831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient_info" DROP CONSTRAINT "UQ_ccc46911046ecf1a58284021d56"`);
        await queryRunner.query(`ALTER TABLE "patient_info" DROP COLUMN "medicalRecordNumber"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient_info" ADD "medicalRecordNumber" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patient_info" ADD CONSTRAINT "UQ_ccc46911046ecf1a58284021d56" UNIQUE ("medicalRecordNumber")`);
    }

}
