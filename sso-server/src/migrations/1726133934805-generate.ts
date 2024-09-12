import { MigrationInterface, QueryRunner } from "typeorm";

export class Generate1726133934805 implements MigrationInterface {
    name = 'Generate1726133934805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient_info" ADD "medicalRecordNumber" SERIAL NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient_info" DROP COLUMN "medicalRecordNumber"`);
    }

}
